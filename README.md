Ask not what Ubuntu can do for you but what you can do for Ubuntu? 

A starting place for contributors to look for projects to work on, This html gently guides users in the right direction depending on interests and skills, and hands off to the appropriate team web page.

This project is HTML, with CSS and Javascript. No special requirements. Most hosting platforms should be able to handle it easily.

## Installing Locally

    git clone https://github.com/ian-weisser/asknot asknot
    cd asknot
Open `index.html` in your favorite browser!

## Credits

This is a reskinned version of Mozilla's AskNot at http://whatcanidoformozilla.org.

A big THANK YOU to all the Mozilla contributors who made this cool software, and to the myriad of other drive-by contributors.

The complete list of contributors who have our gratitude is at https://github.com/ian-weisser/asknot/contributors

## Editing

Edit the colors, fonts, and spacing in the `style.css` file.
Edit content in the `index.html` file.

Content uses a simple tree structure:

    toplevel
        advocacy
        development
        support

    advocacy
        create: http://link
        persuade: http://link
        convert: http://link

    development
        ...

To add or delete content:
- Ensure the toplevel category item ('advocacy') matches a subcategory name.
- You can have multiple levels of lists.
- List items cannot be mixed with link items (unless you edit the javascript to make it possible)
