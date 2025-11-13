// Max theoretical expansion for PackBits is 128 output bytes per input byte pair.
const MAX_EXPANSION_FACTOR = 128;

/**
 * Custom PackBits decoder that honours the `-128` no-op control byte and
 * proactively guards against runaway expansion that would otherwise trigger
 * RangeError: Invalid array length in V8.
 *
 * The implementation follows the TIFF specification:
 *   - [0, 127]  → copy the next (value + 1) literal bytes
 *   - [-127, -1] → repeat the next byte (1 - value) times
 *   - -128        → no operation
 */
export default class SafePackbitsDecoder {
  async decodeBlock(buffer: ArrayBuffer) {
    const view = new DataView(buffer);
    const output: number[] = [];
    const limit = buffer.byteLength * MAX_EXPANSION_FACTOR;

    for (let offset = 0; offset < buffer.byteLength; offset += 1) {
      const header = view.getInt8(offset);

      if (header >= 0 && header <= 127) {
        const literalCount = header + 1;
        for (let i = 0; i < literalCount; i += 1) {
          const index = offset + 1 + i;
          if (index >= buffer.byteLength) {
            throw new Error('PackBits literal run exceeds input buffer.');
          }
          output.push(view.getUint8(index));
        }
        offset += literalCount;
      } else if (header >= -127 && header <= -1) {
        if (offset + 1 >= buffer.byteLength) {
          throw new Error('PackBits repeat run missing value byte.');
        }
        const repeatCount = 1 - header;
        const value = view.getUint8(offset + 1);
        for (let i = 0; i < repeatCount; i += 1) {
          output.push(value);
        }
        offset += 1;
      } else {
        // header === -128 → no operation.
      }

      if (output.length > limit) {
        throw new Error(
          'PackBits expansion exceeded safety threshold; aborting decode.'
        );
      }
    }

    return new Uint8Array(output).buffer;
  }
}
