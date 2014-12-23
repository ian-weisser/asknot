Ask not what Ubuntu can do for you but what you can do for Ubuntu? 

A starting place for contributors to look for projects to work on, This html gently guides users in the right direction depending on interests and skills, and hands off to the appropriate team web page.

This project is HTML, with CSS and Javascript. No special requirements. Most hosting platforms should be able to handle it easily.
A php version, for Wordpress, is also included.

## Installing Locally, or on a normal web host

    git clone https://github.com/ian-weisser/asknot asknot
    # Open `asknot/html/index.html` in your favorite browser!

## Installing onto Wordpress as a child theme

    git clone https://github.com/ian-weisser/asknot asknot
    # Edit style.css header to match the desired parent theme name and version
    # Create (or edit) a custom page template. Add the following code in the place you want the guidance wizard to be located:
        <?php
          get_template_part( 'guidance_wizard' );
        ?> 
    sudo ln -s asknot/wordpress /var/lib/wordpress/wp-content/themes/
    sudo ln -s asknot/wordpress /var/www/html/wordpress/wp-content/themes/


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
