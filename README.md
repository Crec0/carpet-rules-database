# Carpet Rules database

The central database of all the rules available in carpet and it's extensions.  
This project uses a custom parser to read and process the rules from java files themselves.  

## Contribute

### Adding your repo to the database

If you want to add your extension to the database,  
please add your extension to [data/repos.toml](data/repos.toml) and submit a pull request.

NOTE: If different branches use different settings file, please don't put them all inside "settingsFile" property. Duplicate the object and change branch and settings file path.

#### Selecting the parser version:

If your extension uses the new language file translation carpet rules:
    If you use json files: 
        use `translations-json`
    If you use yaml/yml files:
        use `translations-yaml`
    Otherwise
        [Contact me](#contact)
Otherwise:
    use `legacy`

For now please only include english lang file. Other languages will be added later.

The schema for rule follows:
```toml
# In the below comments, GH => https://github.com

[[parser-version]]
# Display name for your extension
name = "Name"
# GH/owner/repo
#    ^^^^^^^^^^
owner-repo = "owner/repo"
# Path to the settings file containing @Rule annotated fields
# GH/owner/repo/main/src/main/java/path/to/SettingsFile.java
#                                  ^^^^^^^^^^^^^^^^^^^^^^^^^
settings-file-paths = [ "path/to/SettingsFile.java" ]
# Path to the language file
# GH/owner/repo/main/src/main/resources/assets/path/to/lang/en_us.yml
#                                              ^^^^^^^^^^^^^^^^^^^^^^
lang-file-path = "path/to/lang/en_us.yml" 
# Root where carpet rules are contained. 
# ONLY REQUIRED IF YOU USE YAML 
rules-root = "name.some-subroot.some-root.root" 
# Branches that share the settings file paths and lang files
branches = [ "main" ]
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
