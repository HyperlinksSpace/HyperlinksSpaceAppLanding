const GITHUB_LATEST_RELEASE_URL =
  "https://api.github.com/repos/HyperlinksSpace/HyperlinksSpaceProgram/releases/latest";

export const WINDOWS_RELEASES_PAGE =
  "https://github.com/HyperlinksSpace/HyperlinksSpaceProgram/releases/latest";

type GitHubAsset = {
  name: string;
  browser_download_url: string;
};

type GitHubRelease = {
  assets: GitHubAsset[];
};

export function pickWindowsInstallerAsset(
  assets: GitHubAsset[]
): GitHubAsset | undefined {
  const exeAssets = assets.filter(
    (asset) =>
      /\.exe$/i.test(asset.name) && !/\.blockmap$/i.test(asset.name)
  );

  return (
    exeAssets.find((asset) => /installer|setup/i.test(asset.name)) ??
    exeAssets[0]
  );
}

export async function getLatestWindowsDownloadUrl(): Promise<string | null> {
  const response = await fetch(GITHUB_LATEST_RELEASE_URL, {
    headers: {
      Accept: "application/vnd.github+json",
      "User-Agent": "HyperlinksSpace-Landing",
    },
    next: { revalidate: 300 },
  });

  if (!response.ok) return null;

  const release = (await response.json()) as GitHubRelease;
  const asset = pickWindowsInstallerAsset(release.assets);
  return asset?.browser_download_url ?? null;
}
