const REPO = "MozartDev/my_apk_repo"; // Thay bằng repo của bạn!
const APK_FOLDER = "apk";

const renderAPKs = files => {
  const container = document.getElementById("apkList");
  container.innerHTML = files
    .filter(file => file.name.endsWith(".apk"))
    .map(
      file => `
            <li class="apk-item">
                <a href="${file.download_url}" class="apk-link" download>
                    ${file.name}
                </a>
                <span class="apk-meta">
                    (${(file.size / 1024 / 1024).toFixed(2)} MB)
                </span>
            </li>
        `
    )
    .join("");
};

document.addEventListener("DOMContentLoaded", async () => {
  try {
    const response = await fetch(
      `https://api.github.com/repos/${REPO}/contents/${APK_FOLDER}`
    );
    if (!response.ok) throw new Error("Failed to load APKs");
    const files = await response.json();
    renderAPKs(files);
  } catch (error) {
    document.getElementById("apkList").innerHTML = `
            <li class="error">⚠️ Error: ${error.message}</li>
        `;
  }
});
