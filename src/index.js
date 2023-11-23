import { store, useCommand }    from '@wordpress/commands';
import { dispatch, useDispatch, useSelect  } from '@wordpress/data';
import { __ }       from '@wordpress/i18n';
import { settings, search, comment, button } from '@wordpress/icons';
import { registerPlugin } from '@wordpress/plugins';

/*
    For now we have three commands in this plugin: 
    - open Gutenberg Experiments admin page
    - Toggle Discussion panel in post editor
    - Toggle Button Labels in post and site editor
	- Adding snackbar notification to second example
	Tutorial and code examples from Dev Blog: 
	https://developer.wordpress.org/news/2023/11/getting-started-with-the-command-palette-api/
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

if ( undefined !== wp.editPost ) {
registerPlugin( 'pauli-command-palette', {
	render: () => {
		// Determine if the discussion panel is enabled.
		const discussionPanelEnabled = useSelect( ( select ) => {
			return select( 'core/edit-post' ).isEditorPanelEnabled( 
				'discussion-panel' 
			);
		}, [] );

		// Get functions for toggling panels and creating snackbars.
		const { toggleEditorPanelEnabled } = useDispatch( 'core/edit-post' );
		const { createInfoNotice }         = useDispatch( 'core/notices'   );

		// Register command to toggle discussion panel.
		useCommand( {
			name:  'pauli/discussion-show-hide',
			label: discussionPanelEnabled
			       ? __( 'Hide discussion panel', 'pauli' ) 
			       : __( 'Show discussion panel', 'pauli' ),
			icon:  comment,
			callback: ( { close } ) => {
				// Toggle the discussion panel.
				toggleEditorPanelEnabled( 'discussion-panel' );
				
				// Add a snackbar notice.
				createInfoNotice(
					discussionPanelEnabled
					? __( 'Discussion panel hidden.', 'pauli' )
					: __( 'Discussion panel displayed.', 'pauli' ),
					{
						id:   'dev-blog/toggle-discussion/notice',
						type: 'snackbar'
					}
				);
	
				close();
			}
		} );
	}
} );
}
