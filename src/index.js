import { store }    from '@wordpress/commands';
import { dispatch } from '@wordpress/data';
import { __ }       from '@wordpress/i18n';
import { settings, comment, button } from '@wordpress/icons';

/*
    For now we have three commands in this plugin: 
    - open Gutenberg Experiments admin page
    - Toggle Discussion panel in post editor
    - Toggle Button Labels in post and site editor
*/

dispatch( store ).registerCommand( {
	name:  'pauli/gutenberg-experiments',
	label: __( 'Gutenberg Experiments', 'pauli' ),
	icon:  settings,
	context: 'site-editor',
	callback: ( { close } ) => {
		document.location.href = 'admin.php?page=gutenberg-experiments';
		close();
	}
} );

if ( undefined !== wp.editPost ) {
// only works when a post is edited. 
    dispatch( store ).registerCommand( {
        name:  'pauli/discussion-panel',
        label: __( 'Toggle Discussion Panel', 'pauli' ),
        icon:  comment,
        callback: ( { close } ) => {
            dispatch( 'core/edit-post' ).toggleEditorPanelEnabled(
                'discussion-panel'
            );
            close();
        }
    } );
}

dispatch( store ).registerCommand( {
	name:  'pauli/toggle-button-labels',
	label: __( 'Toggle Button Labels', 'pauli' ),
	icon:  button,
	context: 'site-editor-edit',
	callback: ( { close } ) => {
		
		// Toggles preference for site editor.
		if ( undefined !== wp.editSite ) {
			dispatch( 'core/preferences' ).toggle(
				'core/edit-site',
				'showIconLabels'
			);
		}

		// Toggles preference for post editor.
		else if ( undefined !== wp.editPost ) {
			dispatch( 'core/preferences' ).toggle(
				'core/edit-post',
				'showIconLabels'
			);
		}

		close();
	}
} );
