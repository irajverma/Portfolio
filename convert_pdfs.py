"""Convert all PDF files in Certificate/ and Achievements/ to JPG images."""
import fitz  # PyMuPDF
import os

BASE = os.path.dirname(os.path.abspath(__file__))

pdf_files = [
    # Certificates
    os.path.join(BASE, "Certificate", "Google IT Support.pdf"),
    os.path.join(BASE, "Certificate", "MERN Full Stack.pdf"),
    os.path.join(BASE, "Certificate", "Deloite Job simulation.pdf"),
    os.path.join(BASE, "Certificate", "Applied Machine Learning in Python.pdf"),
    # Achievements (PDFs only)
    os.path.join(BASE, "Achievements", "NIT Jalandhar hackathon.pdf"),
    os.path.join(BASE, "Achievements", "SolVIT hackathon top 5.pdf"),
]

for pdf_path in pdf_files:
    if not os.path.exists(pdf_path):
        print(f"SKIP (not found): {pdf_path}")
        continue

    jpg_path = os.path.splitext(pdf_path)[0] + ".jpg"
    try:
        doc = fitz.open(pdf_path)
        page = doc[0]  # first page only
        # Render at 2x resolution for crisp display
        mat = fitz.Matrix(2.0, 2.0)
        pix = page.get_pixmap(matrix=mat)
        pix.save(jpg_path)
        doc.close()
        print(f"OK: {os.path.basename(pdf_path)} -> {os.path.basename(jpg_path)}")
    except Exception as e:
        print(f"ERROR: {pdf_path} -> {e}")

print("\nDone! All PDFs converted to JPG.")
