import * as React from 'react';
import ReactMarkdown from 'react-markdown';
import { Nl2Br } from '../_components/Nl2Br';

export type AccueilPageProps = {
  ministère: string;
  nomService: string;
  sousTitreService: string;
  liensEntête: { url: string; titre: string }[];
  menu: { url: string; titre: string }[];
  liensFooter: { url: string; titre: string }[];
  descriptionFooter: string;
  body: string;
};

export const AccueilPage = ({
  ministère,
  nomService,
  sousTitreService,
  liensEntête,
  menu,
  liensFooter,
  descriptionFooter,
  body
}: AccueilPageProps) => {
  return (
    <>
      <header role='banner' className='fr-header'>
        <div className='fr-header__body'>
          <div className='fr-container'>
            <div className='fr-header__body-row'>
              <div className='fr-header__brand fr-enlarge-link'>
                <div className='fr-header__brand-top'>
                  <div className='fr-header__logo'>
                    <p className='fr-logo' style={{ whiteSpace: 'pre-wrap' }}>
                      {Nl2Br(ministère)}
                    </p>
                  </div>
                  <div className='fr-header__navbar'>
                    <button
                      className='fr-btn--menu fr-btn'
                      data-fr-opened='false'
                      aria-controls='modal-menu'
                      aria-haspopup='menu'
                      title='Menu'>
                      Menu
                    </button>
                  </div>
                </div>
                <div className='fr-header__service'>
                  <a href='/' title={nomService}>
                    <p className='fr-header__service-title'>{nomService}</p>
                  </a>
                  <p className='fr-header__service-tagline'>{sousTitreService}</p>
                </div>
              </div>
              {liensEntête && liensEntête.length ? (
                <div className='fr-header__tools'>
                  <div className='fr-header__tools-links'>
                    <ul className='fr-links-group'>
                      {liensEntête.map(({ titre, url }, index) => (
                        <li key={`headerLink${index}`}>
                          <a
                            className='fr-link fr-fi-external-link-line fr-link--icon-right'
                            href={url}
                            title={titre}
                            target='_blank'
                            rel='noopener'>
                            {titre}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>
        {menu && menu.length ? (
          <div className='fr-header__menu fr-modal' id='modal-menu' aria-labelledby='button-825'>
            <div className='fr-container'>
              <button className='fr-link--close fr-link' aria-controls='modal-menu'>
                Fermer
              </button>
              <div className='fr-header__menu-links'></div>
              <nav className='fr-nav' role='navigation' aria-label='Menu principal' id='header-navigation'>
                <ul className='fr-nav__list'>
                  {menu.map(({ titre, url }, index) => (
                    <li key={`menu${index}`} className='fr-nav__item'>
                      <a className='fr-nav__link' href={url} target='_self'>
                        {titre}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </div>
        ) : null}
      </header>
      <main role='main' id='contenu'>
        <div className='fr-container fr-py-6w fr-px-2w'>
          <ReactMarkdown children={body} />
        </div>
      </main>
      <footer role='contentinfo' className='fr-footer' id='footer'>
        <div>
          <div className='fr-container'>
            <div className='fr-footer__body'>
              <div className='fr-footer__brand fr-enlarge-link'>
                <a href='/' title='Retour à l’accueil'>
                  <p className='fr-logo'>{Nl2Br(ministère)}</p>
                </a>
              </div>
              <div className='fr-footer__content'>
                <p className='fr-footer__content-desc'>{descriptionFooter}</p>
                <ul className='fr-footer__content-list'>
                  {liensFooter && liensFooter.length
                    ? liensFooter.map(({ titre, url }, index) => (
                        <li className='fr-footer__content-item' key={`footer_${index}`}>
                          <a className='fr-footer__content-link' title={titre} href={url}>
                            {titre}
                          </a>
                        </li>
                      ))
                    : null}
                </ul>
              </div>
            </div>
            <div className='fr-footer__bottom'>
              <ul className='fr-footer__bottom-list'>
                <li className='fr-footer__bottom-item'>
                  <a className='fr-footer__bottom-link' href='/accessibilite'>
                    Accessibilité : non conforme
                  </a>
                </li>
                <li className='fr-footer__bottom-item'>
                  <a className='fr-footer__bottom-link' href='/mentions-legales'>
                    Mentions légales
                  </a>
                </li>
                <li className='fr-footer__bottom-item'>
                  <a className='fr-footer__bottom-link' href='/contact'>
                    Contactez-nous
                  </a>
                </li>
                <li className='fr-footer__bottom-item'>
                  <button
                    className='fr-footer__bottom-link fr-fi-sun-fill-line fr-link--icon-left'
                    aria-controls='fr-theme-modal'
                    data-fr-opened='false'
                    data-fr-js-modal-button='true'>
                    Paramètres d'affichage
                  </button>
                </li>
              </ul>
              <div className='fr-footer__bottom-copy'>
                <p>
                  Sauf mention contraire, tous les contenus de ce site sont sous{' '}
                  <a href='https://github.com/etalab/licence-ouverte/blob/master/LO.md' target='_blank'>
                    licence etalab-2.0
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};
