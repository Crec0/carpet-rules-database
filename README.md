# Carpet Rules database

The central database of all the rules available in carpet and it's extensions.  
This project uses a custom parser to read and process the rules from java files themselves.  

## Contribute

### Adding your repo to the database

If you want to add your extension to the database,  
please add your extension to [data/repos.json](data/repos.json) and submit a pull request.

NOTE: If different branches use differnt settings file, please dont put them all inside "settingsFile" property. Duplicate the object and change branch and settings file path.

The schema for rule follows:
```json
{
    "name": "Your carpet extension name",
    "ownerRepo": "owner/repo",
    "settingsFiles": [
        "group/path/to/settings/file.java",
        "group/path/to/another/settings/file.java"
    ],
    "branches": [
        "branch",
        "another-branch"
    ]
}
```

### Code contributions

Please make an issue or contact me over on [discord](#contact) to discuss your ideas before submitting a pull request.  
Once you are good to go, follow the steps below to submit a pull request.

- Fork/Clone the repo
- Change your directory to the local copy

#### Working on HTML, CSS, JS

- Run `npm install yarn` if you dont have yarn already
- Run `yarn install` to install js packages and tailwindcss
- Run `yarn serve` to start python http local server on port 8000
- Run `yarn start` to start tailwind with watch flag if you are working on css related things
- Add your modifications to the repo
- Run `yarn build` to build the css

#### Working on generator

- Run `npm install yarn` if you dont have yarn already
- Run `pip install -r requirements.txt` to install httpx
- Run `yarn serve` to start python http local server on port 8000
- Follow the instructions in generator/main.py to do local testing
- Add your modifications to the repo

Once you are finished, push the changes and make a PR

### Contact

Discord: `Crec0#0420`
