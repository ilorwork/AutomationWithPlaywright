import test, { Page } from "@playwright/test";
import { readFileSync } from "fs";
import path from "path";

test("simulate drag and drop file", async ({ page }) => {
  await page.goto("https://www.dragdrop.com/test/");
  const fdsa = path.join(__dirname, "../image-1.png");
  const ele = await page.locator('id="dropzone"').click();
  await dragAndDropFile(page, "#demo-upload", fdsa, "image1");
});

const dragAndDropFile = async (
  page: Page,
  selector: string,
  filePath: string,
  fileName: string,
  fileType = ""
) => {
  const buffer = readFileSync(filePath).toString("base64");

  const dataTransfer = await page.evaluateHandle(
    async ({ bufferData, localFileName, localFileType }) => {
      const dt = new DataTransfer();

      const blobData = await fetch(bufferData).then((res) => res.blob());

      const file = new File([blobData], localFileName, { type: localFileType });
      dt.items.add(file);
      return dt;
    },
    {
      bufferData: `data:application/octet-stream;base64,${buffer}`,
      localFileName: fileName,
      localFileType: fileType,
    }
  );

  await page.dispatchEvent(selector, "drop", { dataTransfer });
};
