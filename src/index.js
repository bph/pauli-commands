import { store }    from '@wordpress/commands';
import { dispatch } from '@wordpress/data';
import { __ }       from '@wordpress/i18n';
import { settings, comment, button } from '@wordpress/icons';

dispatch( store ).registerCommand( {
	name:  'pauli-commands/gutenberg-experiments',
	label: __( 'Gutenberg Experiments', 'pauli' ),
	icon:  settings,
	context: 'site-editor',
	callback: ( { close } ) => {
		document.location.href = 'admin.php?page=gutenberg-experiments';
		close();
	}
} );


dispatch( store ).registerCommand( {
	name:  'pauli-commands/discussion-panel',
	label: __( 'Toggle Discussion Panel', 'pauli' ),
	icon:  comment,
	callback: ( { close } ) => {
		dispatch( 'core/edit-post' ).toggleEditorPanelEnabled(
			'discussion-panel'
		);
		close();
	}
} );
