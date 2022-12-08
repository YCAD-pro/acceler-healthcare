export class Site {
  constructor(site) {
    this.site_id = site.site_id;
    this.name = site.name;
    this.siteStreet = site.street;
    this.siteZipCode = site.zip_code;
    this.siteCity = site.city;
    this.siteCountry = site.country;
  }
}
