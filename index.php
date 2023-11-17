<?php
/**
 * Plugin Name:       Pauli Commands
 * Plugin URI:        http://icodeforapurpose.com
 * Description:       Started out following the Developer News post on commands. Will add more later.
 * Version:           1.0.0
 * Requires at least: 6.4
 * Requires PHP:      7.4
 * Author:            Birgit Pauli-Haack
 * Author URI:        http://icodeforapurpose.com
 * Text Domain:       pauli
 */

/* This function checks if a particular asset file (index.asset.php) exists in a 
 specific directory. If it does, the function includes this file to get the script dependencies and version, and then it 
enqueues a JavaScript file (index.js) with those specifications for use in WordPress. 
Detail explanation https://chat.openai.com/share/1fd673d8-b102-4c03-a76b-ba778396c158
*/

add_action( 'enqueue_block_editor_assets', 'pauli_commands_editor_assets' );

function pauli_commands_editor_assets() {
	$asset_file = trailingslashit( __DIR__ ) . 'build/index.asset.php';

	if ( file_exists( $asset_file ) ) {
		$asset = include $asset_file;

		wp_enqueue_script(
			'pauli-commands',
			trailingslashit( plugin_dir_url( __FILE__ ) ) . 'build/index.js',
			$asset['dependencies'],
			$asset['version'],
			true
		);
	}
}
