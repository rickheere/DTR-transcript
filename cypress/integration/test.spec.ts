/// <reference types="cypress" />

// const videos = [
//   {
//     title: 'DTR S6 EP 503: Human Robots',
//     videoId: 'Oz6f9MtIf0s',
//   },
//   {
//     title: 'DTR S6 EP 502: Stupid Experts',
//     videoId: '3rPFECmLJGo',
//   },
//   {
//     title: 'DTR S6 EP 501: The Illuminati Card Game',
//     videoId: '44N6pkank-w',
//   },
//   {
//     title: 'DTR S5 Bonus: Intellectual Horror',
//     videoId: 'PVYMeU6IS5g',
//   },
//   {
//     title: 'DTR S5 Bonus: Baby Adults',
//     videoId: 'pVJcnS5xwSw',
//   },
//   {
//     title: 'DTR Ep 375: Moon Hoax 50th Anniversary',
//     videoId: 'RQ-82JYu6gA',
//   },
// ];
// import asd from '../../videos.json'

// let videos;
let fileExists = undefined;

type Video = {title: string, videoId:string}
import videos from '../../videos.json';


context('Actions', () => {

  Cypress._.times(videos.length, (i) => {
    it('find the transcript!', () => {
      cy.task('fileExists', `./transcripts/${videos[i].title}`).then(
        (hasFile) => {
          fileExists = { fileFound: hasFile, title: videos[i].title };
        }
      );

      cy.wait(100).then(() => {
        console.log({ fileExists });

        if (fileExists === undefined || fileExists.fileFound === true) {
          console.log('transcript found:', {
            currentFile: videos[i].title,
            fileFound: fileExists.title,
          });
          assert.isTrue(true);
        } else {
          console.log('start download: ', videos[i].title);
          cy.visit(`https://www.youtube.com/watch?v=${videos[i].videoId}`, {timeout: 120000});

          cy.get('#container .html5-video-player').click({timeout: 10000});
          cy.get(
            '#menu-container #menu ytd-menu-renderer yt-icon-button#button.dropdown-trigger.style-scope.ytd-menu-renderer'
          ).click({ force: true ,timeout: 10000});
          cy.get(
            '#contentWrapper ytd-menu-popup-renderer ytd-menu-service-item-renderer:nth-child(2) paper-item.style-scope.ytd-menu-service-item-renderer'
          ).click({ force: true ,timeout: 10000});

          cy.get('ytd-transcript-body-renderer', { timeout: 10000 }).then(
            ($transcript) => {
              let transcript;

              Array.prototype.slice
                .call($transcript.children())
                .forEach((element) => {
                  const time = element.children[0]?.innerText;
                  const text = element.children[1]?.innerText;

                  if (time && text) {
                    transcript = `${transcript}\n${time} ${text}`;
                  }
                });
              cy.writeFile(
                `./transcripts/${videos[i].title}`,
                transcript
              ).then(() => true);
            }
          );
        }
      });
    });
  });
});
