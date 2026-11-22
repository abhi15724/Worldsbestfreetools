export default {
'image-to-pdf':{a:[
`The Image to PDF tool turns one or more pictures into a single PDF. You select your images, and the tool places each one on its own page, sized to match the picture, then gives you images.pdf to download. It works with JPG, PNG and other common formats, and the files are processed in your browser instead of being uploaded.`,
`This is the quickest way to bundle phone photos of documents, receipts, certificates or handwritten notes into one file that is easy to email or upload. Pages follow the order in which the files are selected, so you can control the sequence by selecting them in order or by naming them 01, 02, 03.`],
s:[`Click to choose your images; select several at once for a multi-page PDF.`,`Check the order of the files.`,`Press the button to create the PDF.`,`Download images.pdf and open it to confirm every page is present.`],
t:[`Straighten and crop each photo first so the pages look neat.`,`Rename files with numbers if you need an exact page order.`,`Large photos make large PDFs; shrink the pictures first if there is a size limit.`,`For a smaller final file, compress the images before converting.`],
u:`Students use it to submit assignments photographed on a phone, job applicants use it to bundle certificates into one upload, and shop owners use it to assemble invoices and receipts. Office workers use it to convert scanned pages that arrive as images into a proper document.`,
n:`Each page is the size of its image, so mixed photo sizes give mixed page sizes. The tool does not recognise text, so the PDF is made of pictures; use the OCR PDF tool if you need the text. Nothing leaves your device, which matters for personal documents.`,
x:`After merging, preview the PDF in your browser or viewer and scroll through every page. Check that no photo is sideways and that edges are not cut off. If something is wrong, adjust the source picture and run the conversion again, because your originals are never changed.`},

'pdf-to-word':{a:[
`The PDF to Word tool extracts the text from a PDF and saves it as an editable .docx file. It reads each page, groups the text into lines in reading order and writes them into a Word document, giving you converted.docx to download. The conversion happens in your browser, so your file is not sent to a server.`,
`It is designed for text-based PDFs, such as exported reports or letters. Complex layouts, images and tables are not preserved, so the result is best treated as a starting point to edit rather than a perfect copy. If the PDF is a scanned image with no selectable text, the tool tells you so, and you should use the OCR PDF tool first.`],
s:[`Choose the PDF you want to convert.`,`Press Convert to Word.`,`Wait while the pages are read.`,`Download converted.docx and open it in Word or a similar program.`],
t:[`Check the result against the original, especially numbers and lists.`,`Use PDFs created from documents, not scans, for the best text extraction.`,`Re-apply formatting, tables and images by hand if you need them.`,`If your PDF is password-protected, unlock it first with the unlock tool.`],
u:`Students and researchers use it to pull text out of papers and handouts, office staff use it to reuse content from circulars or contracts, and writers use it to recover text from an old PDF they no longer have the source for.`,
n:`Because only the text is extracted, formatting such as columns, fonts, headers, images and tables will not be carried over. Think of the output as clean text in a Word file. Keep the original PDF for reference.`,
x:`For documents with tables, the PDF to Excel tool may give a better result, since it places text into columns. For forms and brochures with heavy design, copying text from a PDF viewer or recreating the layout in Word is often more reliable.`},

'pdf-to-jpg':{a:[
`The PDF to JPG tool renders every page of a PDF as a picture. You choose the PDF, press Convert to JPG, and the tool draws each page on a white canvas at twice the normal scale and saves it as a high-quality JPEG. Each page appears with a preview and its own download button.`,
`This is useful when you need a page as an image: to post it online, drop it into a presentation, send it through a chat app, or upload it somewhere that rejects PDFs. Because pages are rendered at a higher scale, text stays readable. The processing happens in your browser, and the PDF is never uploaded.`],
s:[`Choose the PDF file.`,`Press Convert to JPG.`,`Wait while each page is rendered.`,`Download the page images one by one.`],
t:[`Large PDFs with many pages can take a while to render, so be patient.`,`Download only the pages you need.`,`If you want a single page from a long document, split the PDF first.`,`For smaller images, run the JPGs through a compress-image tool.`],
u:`People use it to share a single page on social media, to put a PDF slide or certificate into a document, or to submit a page where only images are accepted. Designers use it to extract page previews, and teachers use it to turn handouts into images for slides.`,
n:`The JPGs are raster pictures, so text cannot be selected. Pages are drawn on a white background. Original PDFs are not changed.`,
x:`If the output is too big for an upload limit, reduce each page afterwards using the compress or resize tools. A 200 KB target is enough for most pages, and legible text usually remains if you keep the width at about 1,200 pixels or more.`},

'merge-pdf':{a:[
`The Merge PDF tool combines two or more PDF files into one document. Select your files, press Create file, and download merged.pdf. It copies every page from each file into a new PDF in the order you selected the files, so pages stay in their original order inside each document.`,
`Because it copies pages rather than converting them to images, text remains selectable and searchable, images keep their quality and the merged file is about the size of the originals added together. It runs entirely in your browser, which makes it a safe choice for contracts, ID copies and financial documents.`],
s:[`Select the PDF files you want to join.`,`Make sure they are chosen in the order you want.`,`Press Create file.`,`Download merged.pdf and scroll through it to check the order.`],
t:[`Name your files 01, 02, 03 to control the sequence.`,`If a file is password-protected, unlock it first.`,`Rotate sideways pages in the source file before merging.`,`For a smaller result, compress after merging, remembering that compression turns pages into images.`],
u:`Job applicants use it to combine a cover letter, CV and certificates into one application. Accountants and small businesses use it to bundle invoices and statements, and students use it to join scanned assignment pages. Legal and admin staff use it to assemble document packs.`,
n:`The tool merges whole files, not individual pages; use the split tool first if you only want some pages. Large files depend on your device's memory. Your documents are not uploaded.`,
x:`Before sending a merged document, check page orientation, signatures and the final page. A short review catches the most common mistake, which is a missing or out-of-order page. Keep the originals, so you can swap one document and merge again.`},

'split-pdf':{a:[
`The Split PDF tool extracts pages from a PDF into a new file. In the Pages to keep box, enter the pages or ranges you want, such as 1-3,5, press the button and download split.pdf. Only those pages are copied, in the order you type them.`,
`This is the quickest way to pull a single form, a chapter or a signature page out of a long document, or to remove pages you do not want to share. The tool works in your browser and copies the pages directly, so text stays selectable, quality is unchanged and the file never leaves your device.`],
s:[`Choose the PDF.`,`Type the pages to keep, for example 1-3,5 or 2,4,6.`,`Press the button to create the file.`,`Download split.pdf and check the pages.`],
t:[`Separate pages with commas and use a dash for a range.`,`Page numbers beyond the document length are ignored.`,`To split into several files, run the tool once per range.`,`Type pages in the order you want them to appear.`],
u:`People use it to share only the relevant pages of a bank statement or contract, to extract an ID page from a scanned bundle, to cut a chapter from an ebook for study, or to remove confidential pages before emailing a document.`,
n:`The original PDF is untouched. If you need to remove pages instead of keeping them, list the pages you want to retain and leave out the rest. All processing happens locally.`,
x:`If a PDF is protected, unlock it before splitting. To rearrange pages, extract them in the order you want and, if necessary, merge several extracted files together afterwards. Always open the new file once to confirm it contains exactly the pages you intended.`},

'compress-pdf':{a:[
`The Compress PDF tool reduces a PDF's size by turning each page into a compressed JPEG and rebuilding the document. You choose the quality (High, Medium or Low), press Compress PDF and download the smaller file. Page sizes are kept the same.`,
`This method is very effective for scanned documents and image-heavy files, where size is mostly pictures. The trade-off is important: because pages become images, text is no longer selectable or searchable, and fine print may look softer at low quality. It runs in your browser, so documents are not uploaded.`],
s:[`Choose the PDF.`,`Pick a quality level; Medium is the default.`,`Press Compress PDF and wait for the pages to be processed.`,`Check the new size and download the result.`],
t:[`Start with Medium and move to Low only if you still need a smaller file.`,`Keep the original if you may need selectable text later.`,`For documents that are mainly text, the original is often already small.`,`If you need text, run OCR on the compressed file or use the original.`],
u:`People use it to meet the size limits of job portals, email and government sites. Students use it to submit scanned assignments, and offices use it to archive scans. It suits situations where appearance matters more than text searching.`,
n:`Because the output is made of images, the file is not suitable when you need to copy or search text. Always keep the original PDF.`,
x:`Scanned PDFs at very high resolution benefit most. If your scan is huge, rescan at a moderate resolution instead of compressing repeatedly. Compare the first compressed page with the original to see if the quality level suits your purpose before processing a long file.`},

'word-to-pdf':{a:[
`The Word to PDF tool converts a .docx document into a PDF using your browser. It reads the file, turns it into clean HTML that keeps headings, paragraphs, lists, tables and images, and opens the print dialog; you then choose Save as PDF as the destination.`,
`Because it runs in your browser, your document is not uploaded to any server. It handles typical letters, reports and assignments well. Complex layouts, text boxes, special fonts and headers or footers are simplified, so the PDF may not match Word's page layout exactly.`],
s:[`Choose a .docx file.`,`Press Convert to PDF.`,`When the print window opens, choose Save as PDF as the destination.`,`Save the file and check how it looks.`],
t:[`Only .docx files are supported; save older .doc files as .docx first.`,`Check page breaks and tables in the result.`,`If your layout is complex, export directly from Word instead.`,`Allow pop-ups if your browser blocks the print window.`],
u:`Students use it to submit assignments as PDF, job seekers use it to send a CV that cannot be edited, and office workers use it to share documents safely. It is also handy on a computer without Microsoft Word installed.`,
n:`The result depends on the browser's print engine. Fonts that are not installed on your device will be replaced, and the output may be paginated differently from Word.`,
x:`For a CV or an official letter, always open the final PDF and look at it page by page before sending. If the layout is not right, try simplifying the document, removing text boxes and using standard fonts, then convert again.`},

'excel-to-pdf':{a:[
`The Excel to PDF tool converts spreadsheets (.xlsx, .xls and .csv) into a PDF through your browser. It reads every sheet, renders each one as a table with a heading and then opens the print dialog so you can choose Save as PDF.`,
`This is helpful for sharing a read-only copy of a sheet, printing reports or sending data to people without Excel. Cell values are included, but advanced formatting such as charts, conditional colours and exact column widths is not reproduced. Nothing is uploaded, because the processing happens on your device.`],
s:[`Choose your spreadsheet file.`,`Press Convert to PDF.`,`In the print window, select Save as PDF.`,`Save and review the PDF.`],
t:[`Hide or delete columns you do not want printed before converting.`,`Large sheets may span many pages; check the page breaks.`,`Use landscape in the print options for wide tables.`,`For charts and exact formatting, export from Excel itself.`],
u:`Accountants and small business owners use it to share reports, students use it to submit data tables, and managers use it to send read-only copies of schedules. People who receive a CSV file use it to produce a tidy, printable table.`,
n:`The output shows values as text in tables, so formulas are not retained. All sheets in the workbook are included in order.`,
x:`If the PDF looks cramped, simplify the sheet first: remove unused columns, shorten long text and make sure there are headings. A clean, simple table converts far better than a dense workbook full of merged cells.`},

'powerpoint-to-pdf':{a:[
`The PowerPoint to PDF tool converts a .pptx presentation into a PDF through your browser. It renders each slide using a presentation viewer, sets the page size to 16:9, and opens the print dialog; choose Save as PDF to create the file with one slide per page.`,
`It is meant for quickly sharing slides as a PDF that anyone can open. Text, shapes and images are rendered, but animations, transitions, videos and some unusual fonts or effects are not reproduced. Your file is processed on your device and is not uploaded.`],
s:[`Choose a .pptx file.`,`Press Convert to PDF and wait for the slides to render.`,`In the print window, choose Save as PDF.`,`Save the file and flip through it to check the slides.`],
t:[`Only .pptx files are supported; save older .ppt files as .pptx first.`,`Check that fonts and images appear correctly.`,`For perfect fidelity, use the export option in PowerPoint.`,`Allow pop-ups if the print window does not appear.`],
u:`Students use it to submit presentations, speakers use it to share slides after a talk, and teachers use it to distribute lecture decks as handouts. It helps when you are on a device without PowerPoint.`,
n:`This is a browser-based approximation, so complex designs may differ slightly from the original.`,
x:`After converting, check the first and last slide, and any slide with charts or custom fonts. If a slide looks wrong, try simplifying that slide, or use PowerPoint's own export where exact layout is critical, such as for a client or exam.`},

'sign-pdf':{a:[
`The Sign PDF tool places a signature on a page of your PDF. You can type your name, which is drawn in a handwriting-style font, or upload an image of your own signature. You choose the page number, the horizontal and vertical position as percentages and the width of the signature, and the tool saves a signed copy.`,
`This is a visual signature, like signing a printed page with a pen: it is useful for forms, letters and agreements that only need your mark. It is not a certificate-based digital signature. The file is processed in your browser and not uploaded.`],
s:[`Choose the PDF.`,`Type your name or upload a signature image.`,`Set the page, position and size of the signature.`,`Press the button and download the signed PDF.`],
t:[`Use a transparent or white-background signature image for a clean look.`,`Adjust the horizontal and vertical percentages until the signature lines up with the signature line.`,`Make the width about 20 to 30 percent for a natural size.`,`Check the result on the right page before sending.`],
u:`Employees use it to sign leave forms and offer letters, freelancers use it to sign contracts and invoices, and students use it to sign applications. It spares you the print, sign and scan routine.`,
n:`Some institutions require a legally defined electronic or digital signature, so check what is accepted.`,
x:`If you sign often, save a clean image of your signature once, on white paper with a dark pen and a tight crop. Uploading the same image each time keeps your signature consistent and avoids retyping your name in a handwriting font.`},

'protect-pdf':{a:[
`The Protect PDF tool adds a password to a PDF. Choose the file, type a password and press Protect PDF, and the tool creates protected.pdf that asks for the password before opening. The file is encrypted in your browser, so the original and the password are never uploaded.`,
`It also restricts copying and editing of the content, while still allowing high-resolution printing. Use it when you need to email a sensitive document such as a statement, a medical report or a contract, and want only the people who know the password to open it.`],
s:[`Choose the PDF.`,`Type a strong password.`,`Press Protect PDF.`,`Download protected.pdf and test it by opening it with the password.`],
t:[`Use a long, unique password and share it through a different channel than the file.`,`Keep a note of the password; it cannot be recovered.`,`Keep the unprotected original in a safe place.`,`Do not reuse the password you use for email or banking.`],
u:`Professionals use it to send confidential reports, individuals use it to protect financial and medical papers, and small businesses use it to share quotes and contracts with clients. It is also useful for files stored on a shared drive.`,
n:`No password can be recovered by us, because we never receive it. If you forget it, the file cannot be opened.`,
x:`Treat the password like a key: do not put it in the same email as the file, and pick something not guessable from your name or birth date. A random passphrase from the password generator is a good choice for documents that really matter.`},

'unlock-pdf':{a:[
`The Unlock PDF tool removes the password from a PDF you are allowed to open. Choose the file, enter its password if one is needed and press Unlock PDF, and the tool creates a new copy of the pages without the password protection.`,
`It is meant for the common case where you know the password but are tired of typing it, or where you want to merge, split or edit a protected file. It does not guess or crack passwords. Everything runs in your browser, so neither the file nor the password is uploaded.`],
s:[`Choose the protected PDF.`,`Enter its password.`,`Press Unlock PDF.`,`Download the unlocked copy.`],
t:[`Only unlock files you own or have permission to unlock.`,`Double-check the password if the tool reports an error.`,`Keep the original protected file if it is sensitive.`,`After unlocking, store the new copy somewhere safe.`],
u:`People use it to remove passwords from their own bank statements and bills, to prepare protected files for merging or splitting, and to open documents on devices that struggle with encrypted PDFs.`,
n:`If you do not know the password, this tool cannot help, and it should not be used to bypass protection on files that are not yours.`,
x:`An unlocked copy is no longer protected, so anyone who gets the file can open it. If it contains personal data, delete it when you finish, or protect it again with a new password using the Protect PDF tool.`},

'rotate-pdf':{a:[
`The Rotate PDF tool turns every page of a PDF by 90 degrees clockwise, 180 degrees or 90 degrees anticlockwise. Choose the file, pick the rotation and download rotated.pdf. The rotation is saved in the file so it opens correctly everywhere.`,
`This fixes scans and phone photos that came out sideways or upside down. Because only the page rotation setting is changed, the content is not re-rendered, so text stays sharp and selectable and the file size stays the same. It works in your browser and the document is not uploaded.`],
s:[`Choose the PDF.`,`Select the rotation: 90° clockwise, 180° or 90° anticlockwise.`,`Press the button to create the file.`,`Download rotated.pdf and check it.`],
t:[`The rotation applies to all pages; split first if only some pages need it.`,`For a landscape page shown sideways, try 90° in the direction that looks upright.`,`You can run the tool again to rotate further.`,`Rotate before merging so the combined file looks tidy.`],
u:`People use it to fix scanned documents that came out sideways, to correct photos converted to PDF, and to straighten pages before printing or sharing. Office workers use it when an archive contains mixed orientations.`,
n:`Rotation changes only the view of the page; the content is untouched. The original file is not modified.`,
x:`If only a few pages are wrong, extract those pages with the split tool, rotate them, and merge everything back in the right order. It takes a minute and gives a neat document without rescanning any pages.`},

'pdf-to-excel':{a:[
`The PDF to Excel tool pulls text from a PDF into a spreadsheet. It reads where each piece of text sits on the page, groups text on the same line into a row and aligns pieces into columns, creating one worksheet per page in converted.xlsx.`,
`It works best on text-based PDFs that contain table-like data, such as statements or reports exported from software. Scanned PDFs have no selectable text, so run OCR first. Complicated layouts may need cleaning afterwards. The conversion happens in your browser and the file is not uploaded.`],
s:[`Choose the PDF.`,`Press Convert to Excel.`,`Wait while the pages are read.`,`Download converted.xlsx and review it in a spreadsheet program.`],
t:[`Check numbers and columns carefully before relying on them.`,`Merged cells and multi-line cells may be split across rows.`,`If a table is misaligned, adjust columns manually in Excel.`,`Use clean, text-based PDFs for the best results.`],
u:`Accountants and analysts use it to get figures out of statements and reports, students use it to reuse data from papers, and small business owners use it to move invoice or stock lists into a sheet.`,
n:`It makes a best-effort layout from text positions, so treat the output as a starting point. Always verify totals against the PDF.`,
x:`Do a quick sum check: add a column in Excel and compare totals to the numbers printed in the PDF. If they match, the extraction is likely fine. If not, scan the rows for split or merged numbers and fix them by hand.`},

'ocr-pdf':{a:[
`The OCR PDF tool reads text from a scanned PDF. It renders each page as an image, runs OCR (optical character recognition) in your browser and shows the recognised text for all pages in one box, with a marker between pages. You can choose English, Hindi or both together.`,
`Use it when a PDF is only a picture of a page, so you cannot select or copy its text. The output is plain text that you can copy into a document; it does not create a new searchable PDF. The first run downloads language data, and the work is done on your device without uploading your file.`],
s:[`Choose a scanned PDF.`,`Select the language, or English plus Hindi for mixed text.`,`Press Extract text and wait while each page is read.`,`Copy the text and proofread it.`],
t:[`Use clear scans at a sensible resolution; blurry pages produce errors.`,`Pick the right language for much better accuracy.`,`Long PDFs take time, since every page is processed.`,`Check numbers and names carefully.`],
u:`Students use it to extract text from scanned notes and books, offices use it to digitise old paperwork, and researchers use it to quote from scanned reports. Anyone with a PDF made from photos can turn it into editable text.`,
n:`OCR is imperfect, especially for handwriting, tables and stylised fonts. Treat the output as a draft to correct.`,
x:`For tables, expect the cell structure to be lost: the tool gives lines of text. If you need data in columns, paste the text into a spreadsheet and use text-to-columns, or retype the key numbers while comparing with the scan.`}
};
