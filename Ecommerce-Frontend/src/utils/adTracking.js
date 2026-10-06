export function captureAdTracking() {
  const params = new URLSearchParams(window.location.search);

  const campaignId = params.get("campaign_id");
  const adGroupId = params.get("ad_group_id");
  const keyword = params.get("keyword");
  const gclid = params.get("gclid");

  // Save Google Ads campaign information
  if (campaignId) {
    localStorage.setItem("campaignId", campaignId);
  }

  if (adGroupId) {
    localStorage.setItem("adGroupId", adGroupId);
  }

  if (keyword) {
    localStorage.setItem("adKeyword", keyword);
  }

  if (gclid) {
    localStorage.setItem("gclid", gclid);
  }
}

export function getAdTracking() {
  return {
    campaignId: localStorage.getItem("campaignId") || "",
    adGroupId: localStorage.getItem("adGroupId") || "",
    keyword: localStorage.getItem("adKeyword") || "",
    gclid: localStorage.getItem("gclid") || "",
  };
}
