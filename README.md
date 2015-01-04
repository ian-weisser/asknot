Ask not what Ubuntu can do for you but what you can do for Ubuntu? 

A starting place for contributors to look for projects to work on, this html-based wizard gently guides users in the right direction depending on interests and skills, and hands off to the appropriate team web page. It's easy to edit the content, and it should properly inherit your web site's custom CSS or Wordpress Theme.

This project is HTML, with CSS and Javascript. No special requirements. Most hosting platforms should be able to handle it easily.

A version for a Wordpress child theme is also included.

Two versions for testing the community.ubuntu.com website are included, though you may wish to get those branches from Launchpad instead: https://code.launchpad.net/ubuntu-community-website

A great landing page for each role is strongly recommended, but outside the scope of this tool. A great landing page usually includes sections like: Welcome, prerequisites, how to get started, how to measure your progress, and how to ask for help.

## Try it out without installing anything

- Do:
    git clone https://github.com/ian-weisser/asknot

- Open `asknot/index.html` in your favorite browser.
- The .php and .stub files are not used, and can be safely removed.


## Installing as a standalone web page
This is handy for trying out new features and debugging without all the Wordpress overhead and interference.

- Do:
```
    cd /path/to/your/web/dir/
    git clone https://github.com/ian-weisser/asknot
```
- Open `http://localhost/asknot/index.html` in your favorite browser.
- The .php and .stub files are not used, and can be safely removed. 


## Installing onto generic Wordpress as a child theme

- Do:
```
    git clone https://github.com/ian-weisser/asknot
    sudo ln -s asknot/wordpress_theme /var/lib/wordpress/wp-content/themes/
    sudo ln -s asknot/wordpress_theme /var/www/html/wordpress/wp-content/themes/
```
- Create a header file 'style.css' to match your desired parent theme name and version
- As a child theme, Wordpress will automatically load functions.php.
- Wordpress includes it's own jQuery.js. The version of jQuery included with this software is not used, and can be safely removed.
- Rename `index.html` to `guidance_wizard.php`. Edit the file to remove the HTML header and footer (ther are comments in the file showing you what to remove). 
- Create a custom page template. Anywhere in the body of the template, place this code: 
```
//Add the following code in the place you want the guidance wizard to be located:
<?php
  get_template_part( 'guidance_wizard' );
?> 
```
- Switch to the new template (or switch away and back again). As a child theme, Wordpress will automatically enqueue the CSS and JS when it runs functions.php. When you open the templated page, the wizard should automatically load and run.


## Installing onto a branch of community.ubuntu.com

You should use the Launchpad branch instead of the git version.
These instructions show how the github files were installed into the LP branches.
Further updates should be in the branched directly. Don't re-import the github data.

1) Setup:
```
git clone https://github.com/ian-weisser/asknot
bzr branch lp:ubuntu-community-website  # Download the Ubuntu Community Website style
sudo ln -s ubuntu-community-website /var/lib/wordpress/wp-content/themes
sudo ln -s ubuntu-community-website /var/www/html/wordpress/wp-content/themes/
```

2) Install CSS and JS and Images:
```
cp asknot/guidance_wizard.css ubuntu-community-website/library/css/
bzr add ubuntu-community-website/library/css/guidance_wizard.css
cp asknot/guidance_wizard.js  ubuntu-community-website/library/js/
bzr add ubuntu-community-website/library/js/guidance_wizard.js
cp asknot/images/* ubuntu-community-website/library/images/pictograms/
bzr add ubuntu-community-website/library/images/pictograms/*
```

3) Install a header to pull in CSS and JS. The UCW website doesn't seem to use functions.php to enqueue them
```
cp asknot/guidance_wizard_header.php ubuntu-community-website/
bzr add ubuntu-communtiy-website/guidance_wizard_header.php
```
- Open asknot/header.php.stub, and follow it's instructions to place a guidance_wizard_header hook into ubuntu-community-website/header.php


4) Install the content
- Edit asknot/index.html to remove the header and footer HTML. Use the comments inside the file as a guide. Rename the edited file guidance_wizard.php.
    bzr add ubuntu-community-website/guidance_wizard.php 
- Open the page.php.stub file, and follow it's instructions to add a guidance_wizard.php hook into ubuntu-community-website/page.php.

5) Finally, Let's fix the seven <IMG> tags in guidance_wizard.php:
```
# FROM (index.html)
<img src="images/pictogram-community-50x50.png">

# TO (guidance_wizard.php)
<img src="<?php echo get_stylesheet_directory_uri(); ?>/library/images/pictograms/pictogram-community-50x50.png">
```

jQuery Bug workaround: On your own pull of UCW for testing, the theme does not add jQuery, so the guidance wizard won't work. To load jQuery for testing.
- (Testing) In guidance_wizard_header.php, uncomment the jQuery loader.
- (Production) In guidance_wizard_header.php, leave the jQuery loader commented.


## Important components

*index.html* contains all the choice and list data. Make all content edits there. If using ucw_content, manually enter the contents of the txt file into the wordpress page.

*style.css* is a required header for Wordpress themes. NOT INCLUDED.

*guidance_wizard.css* contains all the formatting, size, color, and placement information. Make all font and format edits there. Most CSS is tied to a specific ID in HTML to prevent name conflicts with parent themes or other services you may have going. In Wordpress, the style.css is a header only to identify the theme. Edit style.css to identify the parent theme.

*guidance_wizard.js* is the javascript magic that shuffles the deck and lays out choice. Leave it alone. It requires JQuery, which is included in the HTML dir. Wordpress includes it's own compatible version of JQuery.

*guidance_wizard_header.php* is the Wordpress header file that loads guidance_wizard.css and guidance_wizard.js.

*functions.php* creates the Wordpress html header for the parent and child themes style.css, guidance_wizard.css, JQuery, and guidance_wizard.js


## How it works in HTML

Pretty simple: Three HTML header tags load jQuery.js, guidance_wizard.js, and style.css. Everything is local (client-side), and occurs inside the browser.

index.html defines all the data.
style.css defines how each type of data is displayed.
guidance_wizard.js tracks which data you are looking at, and which data should come next.
jQuery.js handles making the past-data invisible and the next-data visible.


## How wordpress_theme works in Wordpress

On your web browser, it works about the same. After Wordpress serves the page, everything is local to the browser.

All the Wordpress stuff simply crafts the right HTML file for Wordpress to serve.

*style.css* defines this as a child theme (you get to choose which parent theme)

A single-page template (you build this) tells Wordpress when to use the child theme, and tells Wordpress to include the correct content. 

*functions.php* define the correct HTML headers for style.css, guidance_wizard.css, JQuery.js, and guidance_wizard.js


## Maintenance

Content is handled by the html/php file. You can change content by editing that file and nothing else.

Wordpress editing: Since guidance_wizard.php is a separate file, you can give the maintainer direct control over editing content changes without compromising the rest of your install.

Formatting, themes, and styles are all handled by the CSS file. The CSS does not include specific fonts or sizes - it should inherit whatever you specified in a previous CSS file or BODY tag. The CSS does have some spacing and physical layout (like indents) that you may wish to adjust to match your visual design.

Logic is handled by the JS file. The logic required that each menu of choices must either be a set of submenus or a set of final destination links - you cannot mix them. If you fix this in the JS, please push a patch this way!


## Credits

This is a reskinned version of Mozilla's AskNot at http://whatcanidoformozilla.org.

A big THANK YOU to all the Mozilla contributors who made this cool software, and to the myriad of other drive-by contributors.

The complete list of contributors who have our gratitude is at https://github.com/ian-weisser/asknot/contributors


## Editing the choices

Let's pretend to add a new top-level choice 'Wrestling' to go along with Advocacy, Development, etc.

All changes take place in index.html. You don't need to touch any of the other files.

*First*, let's add the actual list entry in toplevel. 
- We need a string for people to see ("Wrestling")
- We need a unique subgroup ID that people won't see ('wrestle')

```
<div class="group" id="toplevel">
    <p class="question"><img src="itch_icon.png">What scratches your itch?</p> <-- Icon and question
    <ul class="choices">
        <li next-group="advocate">Advocacy</li>
        ***<li next-group="wrestle">Wrestling</li>****     <---- Here it is
        <li next-group="develop">Coding and development</li>
        <li next-group="support">Support</li>
    </ul>
</div>
```

*Second*, let's create the subgroup with three choices.
- The entire subgroup should have an intro string or *question* ("So you like to dress down?")
- Each choice should include a string ("Professional!")
- Some choices may include an expanded description ("best acting job in town")
- Each choice should include a landing URL (http://example.com/pro_wrestling)

```
<div class="group" id="wrestle">   <--- There's that subgroup ID
    <p class="question"><img src="wresle_icon.png">So you like to dress down?</p>  <-- Icon and question
    <ul class="choices">
        <li target="http://example.com/pro_wrestling">Professional!
            <p class="extra">best acting job in town!</p>
        </li>
        <li target="http://example.com/amateur_wrestling">Amateur</li>
                <--- No 'extra' on this item
    </ul>
</div>
```
*Third*, ...no, wait. That was it. Try running it.
