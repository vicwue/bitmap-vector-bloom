# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/272985ce-1694-4357-9dfd-9e33011b2ad7

### Matrix Preview Settings

The application provides a 5x5 matrix preview that helps you find the optimal vectorization settings for your image. The matrix shows different combinations of two key parameters:

- **Columns (Threshold)**: Shows 5 evenly spaced threshold values from 1 to 255
  - These values determine how the image is converted to black and white before vectorization
  - Lower values create more black areas, higher values create more white areas

- **Rows (Optimization Tolerance)**: Shows 5 evenly spaced tolerance values from 0 to 1
  - These values control how precisely the curves follow the original bitmap
  - Lower values create more precise but complex paths, higher values create simpler paths

Each cell in the matrix shows a preview of your image vectorized with that specific combination of settings, while keeping all other settings (like noise removal and corner threshold) at their default values. This allows you to quickly compare 25 different variations and choose the best settings for your image.

Here's how the matrix preview settings are implemented in the code:

```typescript
// Generate 5 threshold values (min to max, evenly spaced)
const thresholdValues = Array.from({ length: 5 }, (_, i) => 
  Math.round(1 + (i * (255 - 1)) / 4)
);
// Example output: [1, 64, 127, 190, 253]

// Generate 5 optimization tolerance values (0 to 1, evenly spaced)
const optToleranceValues = Array.from({ length: 5 }, (_, i) => 
  Number((i * 0.25).toFixed(2))
);
// Example output: [0, 0.25, 0.5, 0.75, 1]

// Generate all 25 combinations
for (let row = 0; row < 5; row++) {
  for (let col = 0; col < 5; col++) {
    const settings: VectorizeSettings = {
      ...baseSettings,
      threshold: thresholdValues[col],
      optTolerance: optToleranceValues[row],
    };
    
    const svg = await vectorizeImage(imageUrl, settings);
    newPreviews[row * 5 + col] = svg;
  }
}
```

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/272985ce-1694-4357-9dfd-9e33011b2ad7) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/272985ce-1694-4357-9dfd-9e33011b2ad7) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)
