# Jasmo2 Gridsome-Typecript-Prismic starter

Template for **Gridsome Typecript** and as CMS _Prismic_.

#### Run update refs for multiple environments in Prismic
1. Create a release in Prismic
2. Look at the code, and update as corresponding:
```
.then((refs) => ({
    staging: refs[1].ref,
    production: refs[0].ref,
  }))
```
3. set the environment variable `PRISMIC_API_REF=''` inside the hidden-file(.gitignore) _.env_
4. run `yarn update-refs`
