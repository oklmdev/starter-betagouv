import { Row, Card, CardTitle, CardDescription, CardImage, Col, Button, Link } from '@dataesr/react-dsfr';
import { Layout } from '../_components/layout/Layout';
import * as React from 'react';

export const AccueilPage = () => {
  return (
    <Layout>
      <section className='section-blue section-main'>
        <div className='section-container'>
          <div className='fr-grid-row fr-grid-row--gutters fr-py-6w'>
            <div className='fr-col fr-col-12 fr-col-md-6'>
              <h1>La célérité c'est bien mais avec modération</h1>
              <div className='button'>
                <a href='/login.html'>Me connecter</a>
              </div>
              <div className='button'>
                <a href='/inscription.html'>M'inscrire</a>
              </div>
            </div>
            <div className='fr-col fr-col-12 fr-col-md-6'>
              <div style={{ marginLeft: 80, position: 'relative' }}>
                <img src={'images/pas-si-vite.svg'} style={{ width: '90%', height: '90%' }} alt='' />
              </div>
            </div>
          </div>
        </div>
      </section>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '30px' }}>
        <span style={{ fontSize: '30px', fontWeight: 'bold' }}> À la une </span>{' '}
        <span className='actu' style={{ cursor: 'pointer' }}>
          Toutes les actualités ➝{' '}
        </span>
      </div>
      <div>
        <Row>
          <Col>
            <Card href='/'>
              <CardImage alt='alternative' src='http://fakeimg.pl/300/' />
              <CardTitle>Une publicité visant à heurter la sensiblité des plus jeunes</CardTitle>
              <CardDescription>
                La nouvelle campagne publicitaire dénoncant les courses entre la terre et la lune est en ligne et fait parler
                d'elle. Les nouveaux arrêtés de la commission intergalactique vont être mise en place début 2872.
              </CardDescription>
            </Card>
          </Col>
          <Col>
            <Card href='/'>
              <CardTitle>Tout savoir sur le nouveau système de point du permis intergalactique</CardTitle>
              <CardDescription>
                Suite à une recrudescence des infractions comises par les utilisateurs des voies céleste, le gouvernement
                français a décidé pour l'univers d'un nouveau permis de conduire commun, que vous soyez humanoïdes ou non.
              </CardDescription>
            </Card>
          </Col>
          <Col>
            <Card href='/'>
              <CardImage alt='alternative' src='http://fakeimg.pl/300/' />
              <CardTitle>Création d'une nouvelle voie rapide reliant Mars et Saturne</CardTitle>
              <CardDescription>
                Grace à la coopération entre le C.A.S.M (Comité d'Accueil Sympathique de Mars) et le régime démocratique de
                Saturne, une nouvelle voie rapide de 1 199 millions de km à été mise en place afin d'effectuer le trajet en
                seulement 26 années.
              </CardDescription>
            </Card>
          </Col>
        </Row>
      </div>
    </Layout>
  );
};
