Ask not what Ubuntu can do for you but what you can do for Ubuntu? 

A starting place for contributors to look for projects to work on, This html gently guides users in the right direction depending on interests and skills, and hands off to the appropriate team web page.

This project is HTML, with CSS and Javascript. No special requirements. Most hosting platforms should be able to handle it easily.
A php version, for Wordpress, is also included in a separate dir. You can safely delete either the HTML or Wordpress dirs that you are not using.


## Installing Locally, or on a normal web host

    git clone https://github.com/ian-weisser/asknot asknot
    # Open `asknot/html/index.html` in your favorite browser!

    One easy way to install:
    cd /var/www (or wherever your webroot is...)
    git clone https://github.com/ian-weisser/asknot
    mv asknot/html/* ./   # Move the contents of 'html' to the webroot
    rm -rf asknot         # Delete the rest


## Installing onto Wordpress as a child theme

    git clone https://github.com/ian-weisser/asknot asknot
    # Edit style.css header to match the desired parent theme name and version
    # Create (or edit) a custom page template. Add the following code in the place you want the guidance wizard to be located:
        <?php
          get_template_part( 'guidance_wizard' );
        ?> 
    sudo ln -s asknot/wordpress /var/lib/wordpress/wp-content/themes/
    sudo ln -s asknot/wordpress /var/www/html/wordpress/wp-content/themes/

## Important components

index.html / guidance_wizard.php contain all the choice and list data. Make all content edits there first. Index.html includes 'cut above' and 'cut below' lines to convert it into guidance_wizard.php.

style.css is almot identical to both HTML and Wordpress. The wordpress version contains a header section identifying the parent theme. Make all font and format edits there. In Wordpress, edit the header to identify the parent theme.

guidance_wizard.js is identical to both HTML and Wordpress. Leave it alone. It requires JQuery, which is included in the HTML dir. It uses the version of JQuery included in Wordpress.

functions.php is wordpress-only. It creates the html header for the parent and child themes style.css, JQuery, and guidance_wizard.js

index.php is wordpress-only. It is the default template for pages and posts. It's not inccluded - you can copy much of this from the parent theme.

contribute_page_template.php is wordpress-only example single-page template that includes the guidance wizard. As you can see, it's an ordinary page with atinly php code added:
<?php
  get_template_part( 'guidance_wizard' );
?>


## How it works in HTML

Pretty simple: Three HTML header tags load JQuery.js, guidance_wizard.js, and style.css. Everything is local, and occurs inside the browser.

index.html defines all the data.
style.css defines how each type of data is displayed.
guidance_wizard.js tracks which data you are looking at, and which data should come next.
JQuery.js handles making the past-data invisible and the next-data visible.


## How it works in Wordpress

On your web browser, it works exactly the same. After Wordpress serves the page, everything is local to the browser.
All the Wordpress magic simply crafts the right HTML file for Wordpress to serve.
style.css defines this as a child theme (you get to choose which parent theme)
A single-page template (you build this) tells Wordpress when to use the child theme, and tells Wordpress to include the correct content. 
functions.php define the correct HTML headers for style.css, JQuery.js, and guidance_wizard.js

Maintenance note: Since guidance_wizard.php is a separate file, you can give the maintainer direct control over editing content changes without compromising the rest of your install.


## Credits

This is a reskinned version of Mozilla's AskNot at http://whatcanidoformozilla.org.

A big THANK YOU to all the Mozilla contributors who made this cool software, and to the myriad of other drive-by contributors.

The complete list of contributors who have our gratitude is at https://github.com/ian-weisser/asknot/contributors

## Editing the choices

Edit the colors, fonts, and spacing in the `style.css` file.
Edit content in the `index.html` and/or `guidance_wizard.php` files.

Content uses a simple tree structure:

    toplevel   # Each item in the toplevel group must have it's own subgroup below
        advocacy
        development
        support

    advocacy  # Each item in this subgroup is linked to a different landing page
        create: http://link
        persuade: http://link
        convert: http://link

    development # Each item in this subgroup has it's own sub-sub-group below
        C++
	Python
	Ruby

    ...

To add or delete content:
- Ensure the toplevel category item ('advocacy') matches a subcategory name.
- You can have multiple levels of lists.
- List items cannot be mixed with link items (unless you edit the javascript to make it possible)

How it's put together:

Each group is a list of choices in it's own DIV <div class="group" id="advocacy">

The whole group is headed by a single "question" field: <span class="question">What scratches your itch?</span>

Each group is made up of multiple "choices" Each choice in the list contains the choice text, some extra test, and points to a "next-group" or to an URL "target": 
<ul class="choices">
  <li target="http://upstream-project">Create!!
     <div class="extra">Build cool stuff upstream</div>
  </li>
  ...more choices...
</ul>
