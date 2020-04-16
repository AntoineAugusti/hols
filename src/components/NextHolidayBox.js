const { css } = require('emotion')
const { html, getProvinceIdOrFederalString } = require('../utils')
const { theme, insideContainer, horizontalPadding, visuallyHidden } = require('../styles')
const DateHtml = require('./DateHtml.js')
const { relativeDate } = require('../dates')
const { shade, randomInt } = require('../utils/so.js')

const styles = ({
  accent = theme.color.red,
  bg = { angle: 65, width: 62, slant: 35, shade: -14 },
} = {}) => css`
  padding-top: ${theme.space.xl};
  padding-bottom: ${theme.space.xl};
  background: ${accent};
  background: linear-gradient(${bg.angle}deg, ${accent} ${bg.width}%, rgba(0, 0, 0, 0) 50%),
    linear-gradient(10deg, ${accent} ${bg.slant}%, ${shade(accent, bg.shade)} ${bg.slant}%);
  color: white;
  ${horizontalPadding};

  @media (${theme.mq.md}) {
    font-size: calc(16px + 8 * (100vw - 400px) / 400);
  }

  @media (${theme.mq.lg}) {
    font-size: calc(20px + 3 * (100vw - 400px) / 400);
  }

  > div {
    ${insideContainer};
  }

  h1 {
    .h1--intro {
      font-size: 0.533em;
      font-weight: 400;
      margin-bottom: 5px;

      @media (${theme.mq.lg}) {
        font-weight: 300;
      }
    }

    .h1--date {
      font-size: 1.3em;
      font-weight: 700;
    }

    .h1--name {
      font-size: 0.75em;
      font-weight: 400;

      @media (${theme.mq.lg}) {
        font-size: 0.83em;
        font-weight: 300;
      }
    }
  }

  h1,
  p {
    width: 100%;

    @media (${theme.mq.lg}) {
      width: 70%;
      max-width: 850px;
    }
  }

  p {
    margin-bottom: 0;
    margin-top: calc(${theme.space.xl} + ${theme.space.md});

    + p {
      margin-top: ${theme.space.xs};
    }

    @media (${theme.mq.lg}) {
      font-size: 85%;
      margin-top: calc(${theme.space.xl} + ${theme.space.xl});
    }
  }

  a,
  a:visited {
    color: white;
  }
`

const renderCelebratingProvinces = (provinces) => {
  if (provinces.length === 13) {
    return html`<p>National holiday</p>`
  }

  if (provinces.length === 0) {
    return html`<p>Observed by${' '}<a href="/federal">federal industries</a></p> `
  }

  if (provinces.length === 1) {
    return html`
      <p>Observed in${' '}<a href=${`/province/${provinces[0].id}`}>${provinces[0].nameEn}</a></p>
    `
  }

  if (provinces.length === 2) {
    return html`
      <p>
        Observed in${' '}<a href=${`/province/${provinces[0].id}`}>${provinces[0].nameEn}</a> and
        ${' '}<a href=${`/province/${provinces[1].id}`}>${provinces[1].nameEn}</a>
      </p>
    `
  }

  const isLastProvince = (province) => province.id === provinces[provinces.length - 1].id

  return html`
    <p>
      Observed in
      ${provinces.map(
        (p) => html`
          ${isLastProvince(p) ? ' and ' : ' '}<a href=${`/province/${p.id}`}>${p.id}</a
          >${isLastProvince(p) ? '' : ','}
        `,
      )}
    </p>
  `
}

const renderRelativeDate = (dateString) => {
  return html`<p>${relativeDate(dateString)}</p>`
}

const nextHolidayBox = ({ nextHoliday, provinceName = 'Canada', provinceId, federal }) => {
  let bg = {
    angle: randomInt(63, 66),
    width: randomInt(61, 64),
    slant: randomInt(32, 37),
    shade: -randomInt(9, 11),
  }
  const provinceIdOrFederal = getProvinceIdOrFederalString({ provinceId, federal })
  let color = provinceIdOrFederal ? theme.color[provinceIdOrFederal] : theme.color.red

  return html`
    <div class=${styles({ ...color, bg })}>
      <div>
        <h1>
          <div class="h1--intro">
            ${provinceName}’${provinceName.slice(-1) === 's' ? '' : 's'}
            ${' '}next${' '}${federal && 'federal '}<span class=${visuallyHidden}>statutory </span
            >holiday is
          </div>
          <div class="h1--date"><${DateHtml} dateString=${nextHoliday.date} //></div>
          <div class="h1--name">${nextHoliday.nameEn.replace(/ /g, '\u00a0')}</div>
        </h1>
        ${nextHoliday.provinces && !federal
          ? renderCelebratingProvinces(nextHoliday.provinces)
          : renderRelativeDate(nextHoliday.date)}
        ${federal &&
        html`
          <p>
            <a href="/do-federal-holidays-apply-to-me"
              >Find out who gets federal${' '}
              <span class=${visuallyHidden}>statutory </span>holidays</a
            >
          </p>
        `}
      </div>
    </div>
  `
}

module.exports = nextHolidayBox
