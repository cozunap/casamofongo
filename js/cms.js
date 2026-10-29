/**
 * La Casa Del Mofongo - Cloud CMS Service
 * Manages live synchronization for Menu, Dishes, Descriptions, Prices & Media
 */

const CMS_STORAGE_KEY = 'lacasadelmofongo_cms_data_v1';
const CMS_AUTH_KEY = 'lacasadelmofongo_admin_auth';

class CMSService {
  constructor() {
    this.data = null;
    this.listeners = [];
  }

  // Load data: either from remote cloud API, local storage override, or fallback initial data
  async init() {
    try {
      const local = localStorage.getItem(CMS_STORAGE_KEY);
      if (local) {
        this.data = JSON.parse(local);
        return this.data;
      }
    } catch (e) {
      console.warn('CMS: local parse error', e);
    }

    try {
      const res = await fetch('js/initial-menu-data.json?v=' + Date.now());
      if (res.ok) {
        this.data = await res.json();
      }
    } catch (e) {
      console.error('CMS: failed to fetch initial data', e);
    }

    return this.data;
  }

  getData() {
    return this.data;
  }

  // Save changes
  async saveData(newData) {
    this.data = { ...this.data, ...newData, lastUpdated: new Date().toISOString() };
    try {
      localStorage.setItem(CMS_STORAGE_KEY, JSON.stringify(this.data));
    } catch (e) {
      console.error('Failed to save CMS data to storage', e);
    }
    this.notify();
    return true;
  }

  // Menu items CRUD
  getMenuCards() {
    return this.data?.menu_cards || [];
  }

  updateMenuCard(index, updatedItem) {
    if (!this.data || !this.data.menu_cards) return false;
    this.data.menu_cards[index] = { ...this.data.menu_cards[index], ...updatedItem };
    return this.saveData(this.data);
  }

  addMenuCard(newItem) {
    if (!this.data) this.data = { menu_cards: [] };
    if (!this.data.menu_cards) this.data.menu_cards = [];
    this.data.menu_cards.push(newItem);
    return this.saveData(this.data);
  }

  deleteMenuCard(index) {
    if (!this.data || !this.data.menu_cards) return false;
    this.data.menu_cards.splice(index, 1);
    return this.saveData(this.data);
  }

  // Featured courses CRUD
  getFeaturedCourses() {
    return this.data?.featured_courses || [];
  }

  updateFeaturedCourse(index, item) {
    if (!this.data || !this.data.featured_courses) return false;
    this.data.featured_courses[index] = { ...this.data.featured_courses[index], ...item };
    return this.saveData(this.data);
  }

  // Reset to default
  async resetToDefault() {
    localStorage.removeItem(CMS_STORAGE_KEY);
    return await this.init();
  }

  // Event subscription
  subscribe(fn) {
    this.listeners.push(fn);
  }

  notify() {
    this.listeners.forEach(fn => fn(this.data));
  }
}

window.CMSService = new CMSService();
