# Installing Viv from GitHub

Your custom Viv fork is now ready to be installed directly from GitHub!

## Installation in Your Project

### Step 1: Update package.json

In your project's `package.json`, add:

```json
{
  "dependencies": {
    "@hms-dbmi/viv": "github:vinayakgarg20/viv#claude/init-viv-library-011CUKqUByueeWDnHFFJ9Lbo",
    "deck.gl": "^9.1.0",
    "@luma.gl/core": "^9.1.0"
  }
}
```

### Step 2: Install Dependencies

Using pnpm (recommended):
```bash
pnpm install
```

Using npm:
```bash
npm install
```

Using yarn:
```bash
yarn install
```

### Step 3: Import and Use

```javascript
import { PictureInPictureViewer } from '@hms-dbmi/viv';
import { loadOmeTiff } from '@hms-dbmi/viv';

// Your code here
```

## Making Changes to Viv

### Workflow:

1. **Make changes** to the Viv source code in `/home/user/viv/packages/`

2. **Build** the changes:
   ```bash
   cd /home/user/viv
   pnpm build
   ```

3. **Commit** your changes:
   ```bash
   git add -A
   git commit -m "Description of your changes"
   ```

4. **Push** to GitHub:
   ```bash
   git push -u origin claude/init-viv-library-011CUKqUByueeWDnHFFJ9Lbo
   ```

5. **Update** in your project:
   ```bash
   cd /path/to/your/project
   pnpm update @hms-dbmi/viv
   # or force reinstall
   pnpm install --force
   ```

## Using Different Branches/Versions

### Use Main Branch (if you create one):
```json
"@hms-dbmi/viv": "github:vinayakgarg20/viv#main"
```

### Use Specific Commit:
```json
"@hms-dbmi/viv": "github:vinayakgarg20/viv#abc1234"
```

### Use Release Tag:
```json
"@hms-dbmi/viv": "github:vinayakgarg20/viv#v0.18.0-custom.1"
```

## Implementing the PhysicalSize Scaling Fix

When you're ready to implement the fix for sub-micron PhysicalSize values:

### Files to modify:

1. `/home/user/viv/packages/layers/src/utils.js`
2. `/home/user/viv/packages/views/src/utils.js`
3. `/home/user/viv/packages/layers/src/volume-layer/volume-layer.js`

After making changes, follow the workflow above (build, commit, push, update).

## Testing Your Changes

1. Install in your test project
2. Run your application with OME-TIFF files
3. Verify the fix works for images with PhysicalSize < 1.0 micron
4. Check that 3D volume rendering still works correctly

## Creating a Pull Request to Original Viv

Once you've tested your changes:

1. Add the upstream remote:
   ```bash
   git remote add upstream https://github.com/hms-dbmi/viv.git
   ```

2. Create a new branch from upstream main:
   ```bash
   git fetch upstream
   git checkout -b physical-size-fix upstream/main
   ```

3. Cherry-pick your changes:
   ```bash
   git cherry-pick <your-commit-sha>
   ```

4. Push and create PR:
   ```bash
   git push -u origin physical-size-fix
   ```

Then visit https://github.com/hms-dbmi/viv and create a pull request from your fork.

## Troubleshooting

### Build fails on install
- Make sure pnpm is available: `npm install -g pnpm`
- The prepare script will try to build automatically

### Changes not reflecting
- Force reinstall: `pnpm install --force`
- Clear package manager cache: `pnpm store prune`
- Verify correct commit is being used: check package-lock.json or pnpm-lock.yaml

### Import errors
- Ensure peer dependencies are installed: `deck.gl`, `@luma.gl/core`
- Check that the import path is `@hms-dbmi/viv`

## Support

For issues with the original Viv library, see: https://github.com/hms-dbmi/viv/issues
For issues with your fork, check: https://github.com/vinayakgarg20/viv/issues
