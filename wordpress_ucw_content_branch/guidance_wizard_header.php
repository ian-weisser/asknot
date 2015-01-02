<!-- Guidance Wizard header ('Contribute' page only) -->
<?php
if (is_page( 'contribute'  )) {  // Production
if (is_page( 'Sample Page' )) {  // Testing

    // Testing only - the Ubuntu style doesn't include jQuery, but the live website does.
    echo "<script type='text/javascript' src='http://community.ubuntu.com/wp-includes/js/jquery/jquery.js?ver=1.11.0'></script>" . "\n";

    // css header
    $guidance_wizard_css_uri = get_template_directory_uri() . '/library/css/guidance_wizard.css';
    $guidance_wizard_css_line = sprintf("<link rel='stylesheet' id='guidance-wizard-css' href='%s' type='text/css' />", $guidance_wizard_css_uri );
    echo $guidance_wizard_css_line . "\n";

    // js header
    $guidance_wizard_js_uri = get_template_directory_uri() . '/library/js/guidance_wizard.js';
    $guidance_wizard_js_line = sprintf("<script type='text/javascript' src='%s'></script>", $guidance_wizard_js_uri );
    echo $guidance_wizard_js_line . "\n";
    }
?>
<!-- end of Guidance Wizard header -->
