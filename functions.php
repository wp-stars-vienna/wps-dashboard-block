<?php

function enqueue_wp_util() {
	wp_enqueue_script( 'wp-util' );
}

add_action( 'wp_enqueue_scripts', 'enqueue_wp_util' );