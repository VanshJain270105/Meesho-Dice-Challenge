# cloth_mask.py
import cv2
import numpy as np
import os

def simple_mask(src_path, out_path, thresh=250):
    """
    Simple thresholding mask for white backgrounds.
    Handles images with alpha, color (BGR), or grayscale.
    """
    img = cv2.imread(src_path, cv2.IMREAD_UNCHANGED)
    if img is None:
        raise FileNotFoundError(f"Cannot read image: {src_path}")

    # If image has alpha channel (4 channels)
    if img.ndim == 3 and img.shape[2] == 4:
        alpha = img[:, :, 3]
        mask = (alpha > 0).astype('uint8') * 255
        cv2.imwrite(out_path, mask)
        return

    # If grayscale (single channel)
    if img.ndim == 2:
        gray = img
    else:
        # color image (BGR)
        gray = cv2.cvtColor(img[:, :, :3], cv2.COLOR_BGR2GRAY)

    # Use Otsu for robustness against slightly non-white backgrounds
    _, mask = cv2.threshold(gray, thresh, 255, cv2.THRESH_BINARY_INV + cv2.THRESH_OTSU)

    # Morphological clean-up
    kernel = np.ones((5, 5), np.uint8)
    mask = cv2.morphologyEx(mask, cv2.MORPH_CLOSE, kernel)

    cv2.imwrite(out_path, mask)


def grabcut_mask(src_path, out_path, iter_count=5):
    """
    More robust mask generation using GrabCut (fallback).
    """
    img = cv2.imread(src_path)
    if img is None:
        raise FileNotFoundError(f"Cannot read image: {src_path}")
    h, w = img.shape[:2]
    mask = np.zeros((h, w), np.uint8)
    bgdModel = np.zeros((1, 65), np.float64)
    fgdModel = np.zeros((1, 65), np.float64)

    # cv2.grabCut expects rect = (x, y, w, h)
    rect = (5, 5, max(1, w - 10), max(1, h - 10))
    try:
        cv2.grabCut(img, mask, rect, bgdModel, fgdModel, iter_count, cv2.GC_INIT_WITH_RECT)
        mask2 = np.where((mask == 2) | (mask == 0), 0, 255).astype('uint8')
        # Morphological cleanup
        kernel = np.ones((5,5), np.uint8)
        mask2 = cv2.morphologyEx(mask2, cv2.MORPH_CLOSE, kernel)
        cv2.imwrite(out_path, mask2)
    except Exception:
        # fallback to simple threshold if grabCut fails
        simple_mask(src_path, out_path)


def generate_mask_auto(src_path, out_path, min_area_ratio=0.001):
    """
    Try simple_mask; if area is tiny, fallback to grabcut_mask.
    """
    simple_mask(src_path, out_path)
    mask = cv2.imread(out_path, cv2.IMREAD_GRAYSCALE)
    if mask is None:
        raise RuntimeError("Mask generation failed.")
    nonzero = int((mask > 0).sum())
    area = mask.shape[0] * mask.shape[1]
    if area == 0 or (nonzero / float(area)) < min_area_ratio:
        # fallback to grabcut
        grabcut_mask(src_path, out_path)
