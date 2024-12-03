# RI&E	
An Angular-based risk analysis tool for RI&E (risico-inventarisatie en -evaluatie) that enables users to input known data, calculates risk scores for various groups, and helps minimize overall risk.

## Docs

### Manual
A manual can be found [here](public/docs/manual.pdf). 
This manual will help you use the tool

### Technical specifications
If you are going to work on developing this tool further, or fixing issues, you can find technical
specifications as well:
[Dutch](public/docs/Technical%20Specification%20Document%20(NL).pdf)
[English](public/docs/Technical%20Specification%20Document%20(EN).pdf)

## Run locally
The web-tool can be found on 127.0.0.1:4200, after running either of the following commands:

```ng serve```

## Deployment
To deploy to gh-pages:

```npm run deploy```

This command is a shorthand for the full command
```ng deploy --cname=ehbort.nl --repo https://github.com/duravermeer-windesheim/RIE```

Note that if you want to change the domain name, you also need to change it in this command.
