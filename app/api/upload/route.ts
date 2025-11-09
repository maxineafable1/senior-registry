import { NextRequest, NextResponse } from "next/server";
import { join } from "path";

import { stat, mkdir, writeFile } from "fs/promises";

export async function POST(req: NextRequest) {
  const formData = await req.formData();

  const files = formData.getAll("files[]") as (File | string)[];

  const urls = []

  for (let i = 0; i < files.length; i++) {
    const element = files[i]

    if (typeof element === 'string') {
      urls.push(null)
    } else {
      const buffer = Buffer.from(await element.arrayBuffer());
      const relativeUploadDir = '/uploads'

      const uploadDir = join(process.cwd(), "public", relativeUploadDir);

      try {
        await stat(uploadDir);
      } catch (e: any) {
        if (e.code === "ENOENT") {
          // This is for checking the directory is exist (ENOENT : Error No Entry)
          await mkdir(uploadDir, { recursive: true });
        } else {
          console.error(
            "Error while trying to create directory when uploading a file\n",
            e
          );
          return NextResponse.json(
            { error: "Something went wrong." },
            { status: 500 }
          );
        }
      }

      try {
        const imageName = element.name.split('.')[0]
        const imageType = element.name.split('.')[1]

        const filename = `${imageName}-${Date.now()}.${imageType}`

        await writeFile(`${uploadDir}/${filename}`, buffer);

        const fileUrl = `${relativeUploadDir}/${filename}`;

        // return NextResponse.json({ url: fileUrl });
        urls.push(fileUrl)
      } catch (error) {
        return NextResponse.json(
          { error: "Something went wrong. writefileeee" },
          { status: 500 }
        )
      }
    }
  }

  return NextResponse.json({ urls });

  // console.log(image)
  // console.log(uploadDir)

  // try {
  //   await stat(uploadDir);
  // } catch (e: any) {
  //   if (e.code === "ENOENT") {
  //     // This is for checking the directory is exist (ENOENT : Error No Entry)
  //     await mkdir(uploadDir, { recursive: true });
  //   } else {
  //     console.error(
  //       "Error while trying to create directory when uploading a file\n",
  //       e
  //     );
  //     return NextResponse.json(
  //       { error: "Something went wrong." },
  //       { status: 500 }
  //     );
  //   }
  // }

  // try {
  //   const imageName = image.name.split('.')[0]
  //   const imageType = image.name.split('.')[1]

  //   const filename = `${imageName}-${Date.now()}.${imageType}`

  //   await writeFile(`${uploadDir}/${filename}`, buffer);

  //   const fileUrl = `${relativeUploadDir}/${filename}`;

  //   return NextResponse.json({ url: fileUrl });
  // } catch (error) {
  //   return NextResponse.json(
  //     { error: "Something went wrong. writefileeee" },
  //     { status: 500 }
  //   );
  // }

}