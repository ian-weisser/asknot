Ask not what Ubuntu can do for you but what you can do for Ubuntu? 

A starting place for contributors to look for projects to work on, this html-based wizard gently guides users in the right direction depending on interests and skills, and hands off to the appropriate team web page. It's easy to edit the content, and it should properly inherit your web site's custom CSS or Wordpress Theme.

This project is HTML, with CSS and Javascript. No special requirements. Most hosting platforms should be able to handle it easily.

A version for a Wordpress child theme is also included in a separate dir. You can safely delete either the dirs that you are not using.

Two versions for testing the community.ubuntu.com website are included. If you're not testing changes to this website, you can safely delete the dirs. One version has the HTML in content (database). The other version has the HTML as a separate php file.

A great landing page for each role is strongly recommended, but outside the scope of this tool. A great landing page usually includes sections like: Welcome, prerequisites, how to get started, how to measure your progress, and how to ask for help.

## Try it out without installing anything

    git clone https://github.com/ian-weisser/asknot
    # Open `asknot/html/index.html` in your favorite browser.


## Installing as a standalone web page
This is handy for trying out new 
```
    cd /path/to/your/web/dir/
    git clone https://github.com/ian-weisser/asknot
    mv asknot/html/* ./   # Move the contents of 'html' to the web dir
    rm -rf asknot         # (Optional) Delete the rest
```

CSS Bug: The 'Tell me more' and 'I made a mistake' buttons are indented 60px, but the 'Next, please' button is indented 65px to line up properly. See the comments in the CSS (#volunteer_wizard #next .textbutton) This works for standalone web and generic Wordpress. However, it casues a problem with the Ubuntu Community Website theme - change 65 back to 60 for UCW.

## Installing onto generic Wordpress as a child theme

```
    git clone https://github.com/ian-weisser/asknot
    sudo ln -s asknot/wordpress_theme /var/lib/wordpress/wp-content/themes/
    sudo ln -s asknot/wordpress_theme /var/www/html/wordpress/wp-content/themes/
    # Edit the header of style.css to match your desired parent theme name and version
    # Create (or edit) a custom page template. Add the following code in the place you want the guidance wizard to be located:
        <?php
          get_template_part( 'guidance_wizard' );
        ?> 
```

## Installing onto a branch of community.ubuntu.com

This software has been tested against the communty.ubunntu.com style several ways. Don't install as a child theme. Instead:

```
    bzr branch lp:ubuntu-community-website  # Download the UCW style
    sudo ln -s ubuntu-community-website /var/lib/wordpress/wp-content/themes
```

- guidance_wizard.css        belongs in ubuntu-community-website/library/css/
- guidance_wizard.js         belongs in ubuntu-community-website/library/js/
- guidance_wizard_header.php belongs in ubuntu-community-website/library/functions/
- image files                belong  in ubuntu-community-website/library/images/pictograms/
- index.php: Edit this file, and add the file guidance_wizard_header.php below the wp_header. This stub pulls in the .js and .css files. The UCW theme doesn't use functions.php for enqueueing JS and CSS. 

- (HTML in database) enter content.txt onto the page using the web entry tool
- (HTML in php) guidance_wizard.php belongs in ubuntu_community_website/
- (HTML in php) edit index.php to use guidance_wizard.php

jQuery Bug workaround: On your own pull of UCW for testing, the theme does not add jQuery, so the guidance wizard won't work. To load jQuery for testing.
- (Testing) In guidance_wizard_header.php, uncomment the jQuery loader.
- (Production) In guidance_wizard_header.php, leave the jQuery loader commented.

CSS Bug workaround: The 'Tell me more' and 'I made a mistake' buttons are indented 60px, but the 'Next, please' button is indented 65px to line up properly. See the comments in the CSS (#volunteer_wizard #next .textbutton). This problem only occurs if you make a change in the HTML or wordpress_theme CSS, and copy those changes to UCW CSS.
- In guidance_wizard.css, #volunteer_wizard #next .textbutton, change '65px' back to '60px'.


## Important components

*index.html* (html),
*guidance_wizard.php* (wordpress_theme, ucw_php), and
*content.txt* (ucw_content) contain all the choice and list data. Make all content edits there. If using ucw_content, manually enter the contents of the txt file into the wordpress page.

*style.css* (wordpress_theme) is a required header for Wordpress themes.

*guidance_wizard.css* (all) contains all the formatting, size, color, and placement information. Make all font and format edits there. Most CSS is tied to a specific ID in HTML to prevent name conflicts with parent themes or other services you may have going. In Wordpress, the style.css is a header only to identify the theme. Edit style.css to identify the parent theme.

*guidance_wizard.js* (all) is the javascript magic that shuffles the deck and lays out choice. Leave it alone. It requires JQuery, which is included in the HTML dir. Wordpress includes it's own compatible version of JQuery.

*guidance_wizard_header.php* (ucw_php, ucw_content) is the header file that loads guidance_wizard.css and guidance_wizard.js.

*functions.php* (wordpress_theme) creates the html header for the parent and child themes style.css, guidance_wizard.css, JQuery, and guidance_wizard.js

*index.php* (wordpress_theme) is the default template for pages and posts. It's not included - you can copy much of this from the parent theme.

*contribute_page_template.php* (wordpress_theme) is an single-page template that includes the guidance wizard. As you can see, it's an ordinary page with atinly php code added:

```
<?php
  get_template_part( 'guidance_wizard' );
?>
```

## How it works in HTML

Pretty simple: Three HTML header tags load jQuery.js, guidance_wizard.js, and style.css. Everything is local (client-side), and occurs inside the browser.

index.html defines all the data.
style.css defines how each type of data is displayed.
guidance_wizard.js tracks which data you are looking at, and which data should come next.
jQuery.js handles making the past-data invisible and the next-data visible.


## How wordpress_theme works in Wordpress

On your web browser, it works exactly the same. After Wordpress serves the page, everything is local to the browser.

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
- We need a string ("Wrestling")
- We need a subgroup ID ('wrestle')

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
