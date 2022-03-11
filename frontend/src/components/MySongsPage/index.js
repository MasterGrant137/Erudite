import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import * as queryActions1 from '../../store/queries-1';
import './MySongsPage.css'

export const MySongsPage = () => {
  const dispatch = useDispatch();
  const body = document.querySelector('body');

  useEffect(() => {
      dispatch(queryActions1.mySongs());
  }, [dispatch])

  const contextMenuHandler = async(mainE) => {
    mainE.preventDefault();
    let posX = mainE.pageX;
    let posY = mainE.pageY;

    const contextMenu = document.getElementById('context-menu');
    contextMenu.classList.remove('invisible');
    contextMenu.style.position = 'absolute';
    contextMenu.style.display = 'visible';
    contextMenu.style.left = `${posX}px`;
    contextMenu.style.top = `${posY}px`;

    const contextMenuItems = Array.from(contextMenu.children);
    contextMenuItems.forEach(menuItem => {
      menuItem.addEventListener('click', (subE) => {
        const cardInputs = Array.from(mainE.target.children);
        cardInputs.map(async(input) => {
          if (input.dataset.msInput === subE.target.dataset.msItem) {
            try {
              await input.select();
              await navigator.clipboard.writeText(input.value);
              alert('Successfully copied to clipboard :D');
            } catch (err) {
              alert('Failed to copy to clipboard ):')
            }
          }
        })
      })
    })
  }

  const onMouseOverHandler = (e, value) => {
    const attrRegex = /(.*?\w)(-)(\d)/

    if (e && value === 'visible') {
      const attrVal = e.target.dataset.identifier.replace(attrRegex, 'subcard$2$3');
      const subcard = document.querySelector(`div[data-identifier='${attrVal}']`);
      subcard.dataset.subcardVisibility='visible';
    } else if (e && value === 'big') {
      const attrVal = e.target.dataset.identifier.replace(attrRegex, 'card$2$3');
      const card = document.querySelector(`div[data-identifier='${attrVal}']`);
      card.dataset.cardSize='big';
    }
  }

    const onMouseOutHandler = (e, value) => {
        const attrRegex = /(.*?\w)(-)(\d)/

        if (e && value === 'hidden') {
            const attrVal = e.target.dataset.identifier.replace(attrRegex, 'subcard$2$3');
            const subcard = document.querySelector(`div[data-identifier='${attrVal}']`);
            subcard.dataset.subcardVisibility='hidden';
        } else if (e && value === 'small') {
            const attrVal = e.target.dataset.identifier.replace(attrRegex, 'card$2$3');
            const card = document.querySelector(`div[data-identifier='${attrVal}']`);
            card.dataset.cardSize='small';
        }
    }

    body.addEventListener('click', (e) => {
        const contextMenu = document.getElementById('context-menu');
        if (e.target.offsetParent !== contextMenu) {
            contextMenu?.classList.add('invisible')
        }
    })

    const songs = useSelector(state => {
        return state.queriedSongs;
    })

    const songDiv = Object.values(songs).map(song => (
        <div key={song?.id}>
            <div
                data-identifier={`card-${song?.id}`}
                data-card-size='small'
                className='mySongs-card'
                onMouseOver={(e) => {
                    onMouseOverHandler(e, 'visible');
                    onMouseOverHandler(e, 'big');
                }}
                onMouseOut={(e) => {
                    onMouseOutHandler(e, 'hidden');
                    onMouseOutHandler(e, 'small');
                }}

                onContextMenu={contextMenuHandler}
            >
                    <input
                        data-identifier={`title-${song?.id}`}
                        data-ms-input='title' value={song?.title} disabled
                        onMouseOver={(e) => {
                            onMouseOverHandler(e, 'visible');
                            onMouseOverHandler(e, 'big');
                        }}
                        onMouseOut={(e) => {
                            onMouseOutHandler(e, 'hidden');
                            onMouseOutHandler(e, 'small');
                        }}
                    />
                    <input
                        data-identifier={`artist-${song?.id}`}
                        data-ms-input='artist' value={song?.artist} disabled
                        onMouseOver={(e) => {
                            onMouseOverHandler(e, 'visible');
                            onMouseOverHandler(e, 'big');
                        }}
                        onMouseOut={(e) => {
                            onMouseOutHandler(e, 'hidden');
                            onMouseOutHandler(e, 'small');
                        }}
                     />
                    <input
                        data-identifier={`producer-${song?.id}`}
                        data-ms-input='producer' value={song?.producer} disabled
                        onMouseOver={(e) => {
                            onMouseOverHandler(e, 'visible');
                            onMouseOverHandler(e, 'big');
                        }}
                        onMouseOut={(e) => {
                            onMouseOutHandler(e, 'hidden');
                            onMouseOutHandler(e, 'small');
                        }}
                    />
                    <input
                        data-identifier={`media-${song?.id}`}
                        data-ms-input='media' value={song?.media} disabled
                        onMouseOver={(e) => {
                            onMouseOverHandler(e, 'visible');
                            onMouseOverHandler(e, 'big');
                        }}
                        onMouseOut={(e) => {
                            onMouseOutHandler(e, 'hidden');
                            onMouseOutHandler(e, 'small');
                        }}
                    />
                    <input
                        data-identifier={`coverArt-${song?.id}`}
                        data-ms-input='cover-art' value={song?.coverArt} disabled
                        onMouseOver={(e) => {
                            onMouseOverHandler(e, 'visible');
                            onMouseOverHandler(e, 'big');
                        }}
                        onMouseOut={(e) => {
                            onMouseOutHandler(e, 'hidden');
                            onMouseOutHandler(e, 'small');
                        }}
                    />

                    <NavLink to={`/edit/${song?.id}`}
                        data-identifier={`navLink-${song?.id}`}
                        onMouseOver={(e) => {
                            onMouseOverHandler(e, 'visible');
                            onMouseOverHandler(e, 'big');
                        }}
                        onMouseOut={(e) => {
                            onMouseOutHandler(e, 'hidden');
                            onMouseOutHandler(e, 'small');
                        }}
                    >
                        Edit
                    </NavLink>
                    <textarea
                        data-identifier={`textarea-${song?.id}`}
                        data-ms-input='body' value={song?.body} disabled
                        onMouseOver={(e) => {
                            onMouseOverHandler(e, 'visible');
                            onMouseOverHandler(e, 'big');
                        }}
                        onMouseOut={(e) => {
                            onMouseOutHandler(e, 'hidden');
                            onMouseOutHandler(e, 'small');
                        }}
                    />
             </div>
             <div
                data-identifier={`subcard-${song?.id}`}
                data-subcard-visibility='hidden'
                className='mySongs-subcard'
                onMouseOver={(e) => {
                    onMouseOverHandler(e, 'visible');
                    onMouseOverHandler(e, 'big');
                }}
                onMouseOut={(e) => {
                    onMouseOutHandler(e, 'hidden');
                    onMouseOutHandler(e, 'small');
                }}
             >
                <span
                    data-identifier={`visitsSpan-${song?.id}`}
                    onMouseOver={(e) => {
                        onMouseOverHandler(e, 'visible');
                        onMouseOverHandler(e, 'big');
                    }}
                    onMouseOut={(e) => {
                        onMouseOutHandler(e, 'hidden');
                        onMouseOutHandler(e, 'small');
                    }}
                >
                    Visits: {`${song?.visits}`}
                </span>
                <br />
                <span
                    data-identifier={`createdSpan-${song?.id}`}
                    onMouseOver={(e) => {
                        onMouseOverHandler(e, 'visible');
                        onMouseOverHandler(e, 'small');
                    }}
                    onMouseOut={(e) => {
                        onMouseOutHandler(e, 'hidden');
                        onMouseOutHandler(e, 'big');
                    }}
                >
                    Created: {`${song?.createdAt}`}
                </span>
                <br />
                <span
                    data-identifier={`updatedSpan-${song?.id}`}
                    onMouseOver={(e) => {
                        onMouseOverHandler(e, 'visible');
                        onMouseOverHandler(e, 'big');
                    }}
                    onMouseOut={(e) => {
                        onMouseOutHandler(e, 'hidden');
                        onMouseOutHandler(e, 'small');
                    }}
                >
                    Updated: {`${song?.updatedAt}`}
                </span>
            </div>
        </div>
    ));

    return (
        <div id='mySongs-page-container'>
            <div id='mySongs-bg-color-wrapper'>
                <div id='mySongs-headers-container'>
                    <div id='mySongs-page-header'>Erudite</div>
                    <div id='mySongs-header'>My Songs</div>
                </div>
                <div id='mySongs-carousel'>
                    {songDiv}
                    <div id='context-menu' className='invisible'>
                        <div className='context-menu-item' data-ms-item='title'>Copy Title</div>
                        <div className='context-menu-item' data-ms-item='artist'>Copy Artist</div>
                        <div className='context-menu-item' data-ms-item='producer'>Copy Producer</div>
                        <div className='context-menu-item' data-ms-item='media'>Copy Media</div>
                        <div className='context-menu-item' data-ms-item='cover-art'>Copy Cover Art</div>
                        <div className='context-menu-item' data-ms-item='body'>Copy Body</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MySongsPage;
