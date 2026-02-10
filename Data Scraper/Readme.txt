TRIPNEST – Data Pipeline Information
===================================

This repository follows a structured data pipeline.

Raw scraped datasets are NOT stored in this repository due to:
- Large file sizes
- Noisy/unstructured data
- Source platform restrictions
- Reproducibility reasons

-----------------------------------
Data Generation Process
-----------------------------------

1) Data Scraping
----------------
Raw travel data is collected using the notebook:

    datascrapper.ipynb

This notebook is responsible for:
- Collecting destination titles
- Extracting TripAdvisor links
- Scraping destination metadata
- Gathering raw destination content

Run this notebook to regenerate raw data if required.

-----------------------------------
2) Data Cleaning & Preparation
-----------------------------------

After scraping, multiple data cleaning and preprocessing steps were applied, including:

- Removing duplicates
- Removing irrelevant or noisy records
- Cleaning text data (HTML tags, special characters)
- Normalizing content
- Filtering inconsistent entries
- Structuring destination records

-----------------------------------
3) Feature Engineering & Document Creation
-----------------------------------

The following features were created and added:

- Destination images
- Destination descriptions
- Latitude and longitude coordinates
- Hotel booking links (Booking.com, Agoda)
- Google Maps links
- Category labels
- Review statistics

After cleaning and feature engineering, the final structured dataset was created as:

    documents_updated.csv

This file is used for:
- Model training
- Embedding generation
- Recommendation system
- Backend API processing






----------------------------------------------------
Method Pushing scraped CSV files to GitHub
----------------------------------------------------

After generating the CSV files in the notebook, follow these steps:

Step 1: Check Git status

git status


You should see your new CSV files in scraped_data/<your_folder>/ as untracked.

Step 2: Add the files

Make sure you only add your relevant folder to avoid overwriting others’ data:

git add "scraped_data/charuka/*"    # If your files go into  folder



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
