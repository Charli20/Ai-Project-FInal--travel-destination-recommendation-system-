Method Pushing scraped CSV files to GitHub

After generating the CSV files in the notebook, follow these steps:

Step 1: Check Git status

git status


You should see your new CSV files in scraped_data/<your_folder>/ as untracked.

Step 2: Add the files

Make sure you only add your relevant folder to avoid overwriting others’ data:

git add "scraped_data/charuka/*"    # If your files go into charuka folder
git add "scraped_data/sumudu/*"     # If your files go into sumudu folder
git add "scraped_data/majitha/*"    # If your files go into majitha folder
git add "scraped_data/chalidu/*"    # If your files go into chalidu folder


⚠️ Do not add other team members’ folders. Only stage the folder where your CSVs belong.

Step 3: Commit the changes

git commit -m "Add newly scraped CSV files to <your_folder> folder"


Replace <your_folder> with the actual folder name (e.g., charuka).

Step 4: Pull remote changes (optional but recommended)

git pull origin main --rebase


This ensures your local branch is up-to-date and avoids conflicts with other team members’ pushes.

Step 5: Push to GitHub

git push origin main


Replace main with your branch name if different.
