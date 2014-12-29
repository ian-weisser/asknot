Ask not what Ubuntu can do for you but what you can do for Ubuntu? 

A starting place for contributors to look for projects to work on, this html-based wizard gently guides users in the right direction depending on interests and skills, and hands off to the appropriate team web page. It's easy to edit the content, and it should properly inherit your web site's custom CSS or Wordpress Theme.

This project is HTML, with CSS and Javascript. No special requirements. Most hosting platforms should be able to handle it easily.

A version for Wordpress, is also included in a separate dir. You can safely delete either the HTML or Wordpress dirs that you are not using.

A great landing page for each role is strongly recommended, but outside the scope of this tool. A great landing page usually includes sections like: Welcome, prerequisites, how to get started, how to measure your progress, and how to ask for help.

## Try it out without installing anything

    git clone https://github.com/ian-weisser/asknot
    # Open `asknot/html/index.html` in your favorite browser.


## Installing as a standalone web page

    cd /path/to/your/web/dir/
    git clone https://github.com/ian-weisser/asknot
    mv asknot/html/* ./   # Move the contents of 'html' to the web dir
    rm -rf asknot         # Delete the rest


## Installing onto Wordpress as a child theme

    git clone https://github.com/ian-weisser/asknot
    sudo ln -s asknot/wordpress /var/lib/wordpress/wp-content/themes/
    sudo ln -s asknot/wordpress /var/www/html/wordpress/wp-content/themes/
    # Edit the header of style.css to match your desired parent theme name and version
    # Create (or edit) a custom page template. Add the following code in the place you want the guidance wizard to be located:
        <?php
          get_template_part( 'guidance_wizard' );
        ?> 


## Important components

*index.html* (non-Wordpress version) and *guidance_wizard.php* (Wordpress version) contain all the choice and list data. Make all content edits there.

*style.css* (non-Wordpress version) and *guidance_wizard.css* (Wordpress version) contain all the formatting, size, color, and placement information. Make all font and format edits there. Most CSS is tied to a specific ID in HTML to prevent name conflicts with parent themes or other services you may have going. In Wordpress, the style.css is a header only to identify the theme. Edit style.css to identify the parent theme.

*guidance_wizard.js* is identical in both non-Wordpress and Wordpress versions. Leave it alone. It requires JQuery, which is included in the HTML dir. Wordpress includes it's own compatible version of JQuery.

*functions.php* is wordpress-only. It creates the html header for the parent and child themes style.css, guidance_wizard.css, JQuery, and guidance_wizard.js

*index.php* is wordpress-only. It is the default template for pages and posts. It's not included - you can copy much of this from the parent theme.

*contribute_page_template.php* is wordpress-only example single-page template that includes the guidance wizard. As you can see, it's an ordinary page with atinly php code added:

```
<?php
  get_template_part( 'guidance_wizard' );
?>
```

## How it works in HTML

Pretty simple: Three HTML header tags load JQuery.js, guidance_wizard.js, and style.css. Everything is local (client-side), and occurs inside the browser.

index.html defines all the data.
style.css defines how each type of data is displayed.
guidance_wizard.js tracks which data you are looking at, and which data should come next.
JQuery.js handles making the past-data invisible and the next-data visible.


## How it works in Wordpress

On your web browser, it works exactly the same. After Wordpress serves the page, everything is local to the browser.

All the Wordpress stuff simply crafts the right HTML file for Wordpress to serve.

*style.css* defines this as a child theme (you get to choose which parent theme)

A single-page template (you build this) tells Wordpress when to use the child theme, and tells Wordpress to include the correct content. 

*functions.php* define the correct HTML headers for style.css, guidance_wizard.css, JQuery.js, and guidance_wizard.js


## Maintenance

Content is handled by the html/php file. You can change content by editing that file and nothing else.

Wordpress editing: Since guidance_wizard.php is a separate file, you can give the maintainer direct control over editing content changes without compromising the rest of your install.

Formatting, themes, and styles are all handled by the CSS file. The CSS does not include specific fonts or sizes - it should inherit whatever you specified in a previous CSS file or BODY tag. The CSS does have some spacing and physical layout (like indents) that you may wish to adjust to match your visual design.

Logic is handled by the JS file. THe logic required that each menu of choices must either be a set of submenus or a set of final destination links - you cannot mix them. If you fix this in the JS, please push a patch this way!


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
