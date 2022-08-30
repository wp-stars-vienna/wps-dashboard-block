<?php

/*
  Plugin Name: WPS Dashboard Block Plugin
  Version: 1.3
  Author: WP-Stars
  Author URI: https://github.com/LearnWebCode
*/

if( ! defined( 'ABSPATH' ) ) exit; // Exit if accessed directly

$plugin_dir =  WP_PLUGIN_DIR . '/wps-dashboard-block';
$plugin_url = plugin_dir_url(__FILE__);

define('WPS_DASHBOARD_PLUGIN_DIR', $plugin_dir);
define('WPS_DASHBOARD_PLUGIN_URL', $plugin_url);

// include block classes
include WPS_DASHBOARD_PLUGIN_DIR . "/classes/DashboardBlock.php";


// initialize blocks
$DashboardBlock = new DashboardBlock($plugin_url);

add_action('rest_api_init', 'wps_dash_register_rest_images' );
function wps_dash_register_rest_images() {
    register_rest_field( array('post'),
        'fimg_url',
        array(
            'get_callback'    => 'wps_dash_get_rest_featured_image',
            'update_callback' => null,
            'schema'          => null,
        )
    );
}

function wps_dash_get_rest_featured_image( $object, $field_name, $request ) {
    if( $object['featured_media'] ){
        $img = wp_get_attachment_image_src( $object['featured_media'], 'app-thumb' );
        return $img[0];
    }
    return false;
}


add_action( 'rest_api_init', function () {
    register_rest_route( 'wps_routes/v1', '/get_lehrstelle_options', array(
        'methods' => 'GET',
        'callback' => 'get_lehrstelle_options',
        'permission_callback' => '__return_true'
    ));
});
function get_lehrstelle_options( WP_REST_Request $request ) {
    $lehrberufe = get_posts(
        array(
            'post_type' => 'lehrberufe',
            'numberposts' => '-1'
        )
    );

    $contact_people = get_posts(
        array(
            'post_type' => 'kontaktperson',
            'numberposts' => '-1'
        )
    );

    $return_arr['lehrberufe'] = $lehrberufe;
    $return_arr['contact_people'] = $contact_people;

    $response = new WP_REST_Response($return_arr);
    $response->set_status(200);
    return $response;

    // if(count($profiles) > 0) {
    //     foreach ($profiles as $profile) { 
    //         // if(get_field('profile_picture', $profile)) {
    //             $profile_obj = new stdClass();
    //             $profile_obj->ID = $profile->ID;      
    //             $profile_obj->distance = $profile->distance; 
    //             if(isset($request['city'])) {
    //                 $origin_city = $request['city'];
    //             } else if(get_field('location', $current_profile_id)) {
    //                 $origin_city = get_field('location', $current_profile_id)['city'];
    //             } else {
    //                 $origin_city = 'none';
    //             }
    //             $profile_obj->teaser_html = get_profile_teaser_html($profile, $current_profile_id, $origin_city);
    //             array_push($profile_arr,$profile_obj);
    //         // }

    //     }    
    //     $response = new WP_REST_Response($profile_arr);
    //     $response->set_status(200);
    // } else {
    //     $response = new WP_REST_Response([]);
    //     $response->set_status(200);
    // }

    // return $response;

}


add_action( 'rest_api_init', function () {
    register_rest_route( 'wps_routes/v1', '/contact_form_submit', array(
        'methods' => 'POST',
        'callback' => 'contact_form_submit',
        'permission_callback' => '__return_true'
    ));
});


function wps_dash_contact_form_submit( WP_REST_Request $req ) {

	$body = $req->get_body();
	$body = json_decode($body);
	$contact_email = $body->email;
	$contact_first_name = $body->salutation;
	$contact_first_name = $body->first_name;
	$contact_last_name = $body->last_name;
	$contact_subject = $body->subject;
	$contact_message = $body->message;

	$headers = array('Content-Type: text/html; charset=UTF-8, From: Hildegard Wurst <hello@hildegardwurst.at>');
	wp_mail(get_option( 'admin_email' ), "{$contact_first_name} {$contact_last_name} has contacted you!", $contact_message, $headers);
	// must handle errors

	$response = new stdClass();
	$response->message = "Contact email has been sent";
	$response->body = $body;
	$response->admin_email = get_option( 'admin_email' );

	$res = new WP_REST_Response($response);
	$res->set_status(200);
	return $res;
}


// REMOVE THIS BEFORE GOING LIVE
add_role('kontaktpersonen', __(
    'Kontaktpersonen'),
    array(
        'read'            => true, // Allows a user to read
        'create_posts'      => true, // Allows user to create new posts
        'edit_posts'        => true, // Allows user to edit their own posts
        'edit_others_posts' => true, // Allows user to edit others posts too
        'publish_posts' => true, // Allows the user to publish posts
        'manage_categories' => true, // Allows user to manage post categories
    )
 );