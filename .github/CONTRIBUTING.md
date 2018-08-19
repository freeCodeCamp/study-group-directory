# Contributing

The Study Guide Directory is an important tool for helping to bring together campers with their local peers. 

### Add new and missing groups.
We need help to add new groups as they are created and also to add any that are missing. You can create an issue requesting a new group be added by using the [New Study Group template.](https://github.com/freeCodeCamp/study-group-directory/issues/new?template=new-study-group.md) Alternatively you can use the instructions below to create a pull request to add the entry  if you are comfortable doing so.

### Fix errors in the directory.
There may also be errors or changes required for the information provided for each group.  In particular the location data was sourced from a maps service and sometimes the service identified the wrong location.  You can raise an [issue](https://github.com/freeCodeCamp/study-group-directory/issues/new?template=problem-report.md) to let us know of any problems, or  you can raise a pull request to fix any mistakes.

We welcome pull requests from freeCodeCamp campers (our students) and seasoned JavaScript developers alike! Follow these steps to contribute:

1. Find an existing issue that needs assistance by searching for the [Help Wanted](https://github.com/freeCodeCamp/study-group-directory/labels/help%20wanted) tag, or [create one](https://github.com/freeCodeCamp/study-group-directory/issues/new?template=problem-report.md) if you've seen an issue not already logged.

2. Let us know you are working on it by posting a comment on the issue.

3. Create a fork of the repository.

4. Create a branch in your fork for your changes.

5. When ready submit a pull request to fix, complete the information requested in the template and be sure to include a line in the PR comment that states which issue the PR closes.

Remember to feel free to ask for help in our [Contributors](https://gitter.im/FreeCodeCamp/Contributors) Gitter room.

Working on your first Pull Request? You can learn how from this *free* series [How to Contribute to an Open Source Project on GitHub](https://egghead.io/series/how-to-contribute-to-an-open-source-project-on-github)

### The directory data.
The data for the directory is held in the [campsitesfinal.json](https://github.com/freeCodeCamp/study-group-directory/blob/master/assets/json/campsitesfinal.json). The file is large so will be slow to load on GitHub.

The structure of the file is an array of objects. Each object is an entry in the directory.

The objects are simply collections of name / value pairs, some are mandatory others optional.

Sample entry:
``` javascript
{
    "url": "https://www.facebook.com/groups/free.code.camp.to",
    "city": "Toronto",
    "state": "Ontario",
    "country": "Canada",
    "coordinates": "43.652921, -79.384901",
    "photoUrl": "https://scontent-dft4-2.xx.fbcdn.net/v/t31.0-8/15068500_10210962248150704_3614548903645249833_o.jpg?oh=49670f8c4ac9b83dbbbb1207c3d2b780&oe=599725C0"
}
```

The `url`, `country` and `coordinates` fields are mandatory.  `city` and `state` fields should be used to provide name and area of the location of the group. Either may be left blank if the entry still makes sense without it.  `photoUrl` can be used to provide the groups chosen photo if it has one - presently this is not used but will be in the Events platform.
