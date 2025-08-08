export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9 -]/g, "") // Remove invalid chars
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/-+/g, "-") // Replace multiple - with single -
    .trim(); // Trim - from end of text
}

export function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function randomChoice<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

export function randomPrice(min: number, max: number): number {
  const price = Math.random() * (max - min) + min;
  return Math.round(price * 100) / 100;
}

export function generateSizes(type: "mens" | "womens" | "unisex"): string[] {
  switch (type) {
    case "mens":
      return ["7", "7.5", "8", "8.5", "9", "9.5", "10", "10.5", "11", "11.5", "12", "13"];
    case "womens":
      return ["5", "5.5", "6", "6.5", "7", "7.5", "8", "8.5", "9", "9.5", "10", "10.5", "11"];
    case "unisex":
      return ["6", "6.5", "7", "7.5", "8", "8.5", "9", "9.5", "10", "10.5", "11", "11.5", "12"];
    default:
      return ["6", "6.5", "7", "7.5", "8", "8.5", "9", "9.5", "10", "10.5", "11", "11.5", "12"];
  }
}

export function getBranding(): {
  brandName: string;
  brandDomain: string;
  projectName: string;
  emails: {
    info: string;
    support: string;
    noreply: string;
    warehouse: string;
  };
} {
  const brandName = process.env.SEED_BRAND_NAME ?? "Stride Footwear";
  const brandDomain = process.env.SEED_BRAND_DOMAIN ?? "stridefootwear.com";
  const projectName = brandDomain.split(".")[0] ?? "store";

  const emails = {
    info: `info@${brandDomain}`,
    support: `support@${brandDomain}`,
    noreply: `noreply@${brandDomain}`,
    warehouse: `warehouse@${brandDomain}`,
  };

  return {
    brandName,
    brandDomain,
    projectName,
    emails,
  };
}
