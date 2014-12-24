<?php

// This ensures the parent style loads first, and loads the custom JS
add_action( 'wp_enqueue_scripts', 'theme_enqueue_styles' );
function theme_enqueue_styles() {
    wp_enqueue_style( 'parent-style', get_template_directory_uri() . '/style.css' );
    wp_enqueue_style( 'child-style-head', get_stylesheet_uri(), array( 'parent-style' ) );
    wp_enqueue_style( 'child-style', get_stylesheet_directory_uri() . '/guidance_wizard.css', array( 'parent-style' ) );
    wp_enqueue_script( 'jquery' );  // jquery is included with Wordpress
    wp_enqueue_script( 'guidance_wizard.js', get_stylesheet_directory_uri() . '/guidance_wizard.js' , array(), null, false );
}

?>

