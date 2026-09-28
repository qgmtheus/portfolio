import { PROFILE, PROJECTS } from './data.js';

const $ = (s) => document.querySelector(s);
const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);

const ICON = {
  site: '<svg viewBox="0 0 24 24"><path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5"/></svg>',
  admin: '<svg viewBox="0 0 24 24"><path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/></svg>',
  code: '<svg viewBox="0 0 24 24"><path d="m8 7-5 5 5 5M16 7l5 5-5 5"/></svg>',
  github: '<svg viewBox="0 0 24 24"><path d="M9 19c-4 1.5-4-2-6-2.5m12 5v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.3 4.3 0 0 0-.1-3.2s-1-.3-3.4 1.3a11.6 11.6 0 0 0-6 0C6.8 2.3 5.8 2.6 5.8 2.6a4.3 4.3 0 0 0-.1 3.2A4.6 4.6 0 0 0 4.4 9c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21"/></svg>',
  mail: '<svg viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg>',
  whatsapp: '<svg viewBox="0 0 24 24"><path d="M20 12a8 8 0 0 1-11.8 7l-4.2 1 1.1-4A8 8 0 1 1 20 12Z"/></svg>',
  instagram: '<svg viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/></svg>',
};

const isLive = (url) => url && !url.includes('__');

// ---------- Projetos ----------
$('#projects').innerHTML = PROJECTS.map((p, i) => `
  <article class="project ${i % 2 ? 'project--flip' : ''}" style="--accent:${esc(p.accent)}">
    <a class="project__shot" href="${isLive(p.site) ? esc(p.site) : '#'}" target="_blank" rel="noopener" aria-label="Abrir ${esc(p.title)}">
      <img src="${esc(p.image)}" alt="Tela inicial do projeto ${esc(p.title)}" loading="lazy">
      <span class="project__open">Abrir site ${ICON.site}</span>
    </a>
    <div class="project__body">
      <p class="project__kind">${String(i + 1).padStart(2, '0')} · ${esc(p.kind)}</p>
      <h3>${esc(p.title)}</h3>
      <p class="project__summary">${esc(p.summary)}</p>
      <ul class="project__highlights">${p.highlights.map((h) => `<li>${esc(h)}</li>`).join('')}</ul>
      <ul class="project__stack">${p.stack.map((s) => `<li>${esc(s)}</li>`).join('')}</ul>
      <div class="project__actions">
        ${isLive(p.site) ? `<a class="btn btn--gold" href="${esc(p.site)}" target="_blank" rel="noopener">${ICON.site} Ver site</a>` : ''}
        ${isLive(p.admin) ? `<a class="btn btn--outline" href="${esc(p.admin)}" target="_blank" rel="noopener">${ICON.admin} Painel demo</a>` : ''}
        ${p.code ? `<a class="btn btn--ghost" href="${esc(p.code)}" target="_blank" rel="noopener">${ICON.code} Código</a>` : ''}
      </div>
    </div>
  </article>`).join('') + `
  <article class="project project--soon">
    <p class="project__kind">${String(PROJECTS.length + 1).padStart(2, '0')} · Em breve</p>
    <h3>Próximo projeto em construção</h3>
    <p class="project__summary">Uma nova landing page está a caminho. Quer que o próximo seja o seu negócio?</p>
    <a class="btn btn--outline" href="#contato">Quero um site assim</a>
  </article>`;

// ---------- Números ----------
const techs = new Set(PROJECTS.flatMap((p) => p.stack));
$('#stats').innerHTML = [
  [PROJECTS.length, PROJECTS.length === 1 ? 'projeto no ar' : 'projetos no ar'],
  [techs.size, 'tecnologias'],
  ['100%', 'responsivo'],
].map(([n, l]) => `<li><strong>${n}</strong><span>${l}</span></li>`).join('');

// ---------- Contato ----------
const links = [
  PROFILE.whatsapp && { href: `https://wa.me/${PROFILE.whatsapp}`, icon: ICON.whatsapp, label: 'WhatsApp', main: true },
  PROFILE.email && { href: `mailto:${PROFILE.email}`, icon: ICON.mail, label: PROFILE.email },
  PROFILE.instagram && { href: PROFILE.instagram, icon: ICON.instagram, label: 'Instagram' },
  PROFILE.github && { href: PROFILE.github, icon: ICON.github, label: 'GitHub' },
].filter(Boolean);
$('#contactLinks').innerHTML = links.map((l, i) => `
  <a class="btn ${l.main || (i === 0) ? 'btn--gold' : 'btn--outline'}" href="${esc(l.href)}" target="_blank" rel="noopener">${l.icon} ${esc(l.label)}</a>`).join('');

$('#year').textContent = new Date().getFullYear();

// ---------- Animação ao rolar ----------
const io = new IntersectionObserver((entries) => {
  entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add('is-visible'); io.unobserve(en.target); } });
}, { threshold: .12 });
document.querySelectorAll('.section__head, .project, .service, .contact').forEach((el) => { el.classList.add('reveal'); io.observe(el); });
