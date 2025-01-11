# Carpet Rules database

The central database of all the rules available in carpet and it's extensions.  
This project uses a custom parser to read and process the rules from java files themselves.  

## Contribute

### Adding your repo to the database

If you want to add your extension to the database,  
please add your extension to [data/repos.toml](data/repos.toml) and submit a pull request.

NOTE: If different branches use different settings file, please don't put them all inside "settingsFile" property. Duplicate the object and change branch and settings file path.

#### Selecting the parser version:

<pre>
If your extension uses the new language file translation carpet rules:
    If you use json files: 
        use `translations-json`
    If you use yaml/yml files:
        use `translations-yaml`
    Otherwise
        Contact me
Otherwise:
    Use `legacy`
</pre>

For now please only include english lang file. Other languages will be added later.

The schema for rule follows:
```toml
# In the below comments, GH => https://github.com

[[parser-version]]
# Display name for your extension
name = "Name"
# Repository for the extension
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

#### Working on Frontend

- Run `cd frontend`
- Run `bun i` to install required dependencies
- Run `bun run dev` to start vite server
- Add your modifications to the repo
- Push
- Open a PR :)

#### Working on generator

- Run `pip install -r requirements.txt` to install httpx
- Run `bun i` to start vite server
- Run `bun run copy-rules` to copy over the rules file
- Run `bun run dev` to start vite server
- Follow the instructions in generator/main.py to do local testing
- Add your modifications to the repo

Once you are finished, push the changes and make a PR

### Contact

Discord: `crec0`
