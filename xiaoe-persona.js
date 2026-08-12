window.XIAOE_PERSONA = {
  configUrl: './xiaoe-persona-v1.json',
  defaultMode: 'gentle',

  async load() {
    const res = await fetch(this.configUrl, { cache: 'no-store' });
    if (!res.ok) throw new Error('Unable to load XiaoE Persona config');
    return await res.json();
  },

  resolveMode(config, modeName) {
    const key = modeName || this.defaultMode;
    return config.modes?.[key] || config.modes?.gentle || null;
  }
};
