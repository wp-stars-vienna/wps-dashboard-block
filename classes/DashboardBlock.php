<?php

# dashboardBlock
# dashboard-block

class DashboardBlock {    
	function __construct($plugin_url) {
		add_action( 'init', array( $this, 'onInit' ) );
        $this->plugin_url = $plugin_url; 
	}

	function onInit() {

		wp_register_script( 'dashboardBlockScript', $this->plugin_url . 'build/index.js', array(
			'wp-blocks',
			'wp-element',
			'wp-editor'
		) );
		wp_register_style( 'dashboardBlockStyle', $this->plugin_url . 'build/index.css' );

		register_block_type( 'wpsblocks/wps-dashboard-block', array(
			'render_callback' => array( $this, 'renderCallback' ),
			'editor_script'   => 'dashboardBlockScript',
			'editor_style'    => 'dashboardBlockStyle'
		) );
	}

	function renderCallback( $attributes ) {
		if ( ! is_admin() ) {
			wp_enqueue_script( 'dashboardBlockFrontendScript', $this->plugin_url . 'build/frontend.js', array( 'wp-element' ) );
			wp_localize_script( 'dashboardBlockFrontendScript', 'wpApiSettings', array(
				'root' => esc_url_raw( rest_url() ),
				'nonce' => wp_create_nonce( 'wp_rest' )
			) );
			wp_enqueue_style( 'dashboardBlockFrontendStyles', $this->plugin_url . 'build/frontend.css' );
		}

		$attributes['nonce'] = wp_create_nonce( 'wp_rest' );
		$attributes['rest_url'] = get_rest_url();
        $current_user = wp_get_current_user();
        $attributes['user_first_name'] = get_user_meta( $current_user->ID, 'first_name', true );
        $attributes['user_last_name'] = get_user_meta( $current_user->ID, 'last_name', true );
		$attributes['user_id'] = $current_user->ID;
		$attributes['user_email'] = $current_user->user_email;
		$lehrberufe = get_posts(
			array(
				'post_type' => 'lehrberufe',
				'numberposts' => '-1'
			)
		);
	
		$contact_people = get_posts(
			array(
				'post_type' => 'kontaktpersonen',
				'numberposts' => '-1'
			)
		);
		$lehrstelle_options = [];
		$lehrstelle_options['lehrberufe'] = $lehrberufe;
		$lehrstelle_options['contact_people'] = $contact_people;
		$attributes['lehrstelle_options'] = $lehrstelle_options;

		$full_lehrstelle = [];
        $lehrstelle = get_posts(
            array(
                'posts_per_page' => '12',
				'post_type' => 'lehrstelle',
				'status' => 'any'
            )
        );
		foreach ($lehrstelle as $lehrstellen) {
			$lehrstellen->acf_fields = get_fields($lehrstellen->ID);
			$full_lehrstelle[] = $lehrstellen;
		}
        $attributes['lehrstelle'] = $full_lehrstelle;
        $attributes['dash_url'] = parse_url(get_site_url())['path'] . '/dashboard/';
		$attributes['site_url'] = get_site_url();
        // may need to change this to another custom field instead
        $attributes['avatar_url'] = get_avatar_url( $current_user->ID );


		$attributes['user_lehrbetriebe'] = '';

		ob_start();

		if(is_user_logged_in( )) {
			?>
				<div class="dashboard-block-update-me">
					<pre style="display: none;"><?php echo wp_json_encode( $attributes ) ?></pre>
				</div>
			<?php
		} else { ?>
			<div class="container">
				<div class="row">
					<div class="col-12">
						<?php wp_login_form(); ?>
					</div>
				</div>
			</div>
		<?php }

		return ob_get_clean();
	}
}

// handle rewrites to make sure the page gets called correctly
function wps_dashboard_block_rewrite_rules($rules) {
    add_rewrite_rule(
        'dashboard/(.+)/?',
        'index.php?pagename=dashboard',
        'top' );

}
add_action( 'init', 'wps_dashboard_block_rewrite_rules' );
