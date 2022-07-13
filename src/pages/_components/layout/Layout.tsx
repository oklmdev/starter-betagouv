import React, { useContext } from 'react';
import {
  Container,
  HeaderBody,
  Service,
  Header,
  Logo,
  Footer,
  FooterLink,
  FooterPartners,
  FooterPartnersTitle,
  FooterPartnersLogo,
  FooterBottom,
  FooterCopy,
  ToolItemGroup,
  ToolItem,
  Tool,
} from '@dataesr/react-dsfr';
import { SessionContext } from '../SessionContext';

export type LayoutProps = {
  children: React.ReactNode;
};

export function Layout({ children }: LayoutProps) {
  const { isLoggedIn } = useContext(SessionContext);

  return (
    <html>
      <head>
        <link href='https://cdn.jsdelivr.net/npm/remixicon@2.5.0/fonts/remixicon.css' rel='stylesheet' />
        <link href='style.css' rel='stylesheet' />
        <link href='https://cdn.jsdelivr.net/npm/@gouvfr/dsfr@1.5.1/dist/dsfr.min.css' rel='stylesheet' />
      </head>
      <body>
        <Header>
          <HeaderBody>
            <Logo splitCharacter={10}>Ministère de la sécurité intergalactique </Logo>
            <Service title='S.P.A.C.E' description="Service Protection de l'Accès à la Célérité dans l'Espace" />
            <Tool>
              <ToolItemGroup>
                {isLoggedIn ? (
                  <ToolItem icon='ri-logout-box-line' link='/logout'>
                    Déconnexion
                  </ToolItem>
                ) : (
                  <>
                    <ToolItem icon='ri-pencil-line' link='/inscription.html'>
                      Inscription
                    </ToolItem>
                    <ToolItem icon='ri-lock-line' link='/login.html'>
                      Connexion
                    </ToolItem>
                  </>
                )}
              </ToolItemGroup>
            </Tool>
          </HeaderBody>
        </Header>
        <Container>
          <div style={{ padding: '30px 0' }}>{children}</div>
        </Container>
        <Footer>
          <FooterPartners>
            <FooterPartnersTitle>Nos partenaires</FooterPartnersTitle>

            <FooterPartnersLogo
              href='/'
              imageSrc='data:image/png;base64,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'
              imageAlt='Logo 1'
            />
            <FooterPartnersLogo
              href='/'
              imageSrc='data:image/png;base64,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'
              imageAlt='Logo 2'
            />
          </FooterPartners>
          <FooterBottom>
            <FooterLink href='/'>Nasa</FooterLink>
            <FooterLink href='/'>StarLink</FooterLink>
            <FooterLink href='/'>ESA</FooterLink>
            <FooterLink href='/'>Roscosmos</FooterLink>
            <FooterLink href='/'>Space X</FooterLink>
            <FooterCopy>licence etalab-2.0</FooterCopy>
          </FooterBottom>
        </Footer>
      </body>
    </html>
  );
}
