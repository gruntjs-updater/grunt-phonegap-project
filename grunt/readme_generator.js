module.exports = function (grunt, options) {

    return {
        readme : {
            options: {
                github_username: "CoHyper",
                has_travis: false,
                travis_branch: "master",

                banner: "banner.md",

                readme_folder: "docs/readme",
                output: "README.md",
                table_of_contents: true,
                generate_title: false,

                generate_changelog: true,
                changelog_folder: "docs/changelogs",
                changelog_version_prefix: "v",
                changelog_insert_before: "legal.md",

                generate_footer: false,

                h1: "#",
                h2: "##",
                back_to_top_custom: "#",

                informative: true
            },
            order: {
                "started.md":       "Getting started",
                "options.md":       "The options",
                "task_create.md":   "The task \"create\"",
                "task_build.md":    "The task \"build\"",
                "full_example.md":  "Full example",
                "legal.md":         "License"
            }
        }
    };

};