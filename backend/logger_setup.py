from loguru import logger
import os
import sys

def setup_logger(log_file_path="./crawling.log"):
    """
    Set up logging with Loguru.
    
    Parameters:
    - log_file_path (str): Path to the log file.
    """
    # Clear any existing log handlers to avoid duplicates
    logger.remove()

    # Ensure the log file directory exists
    os.makedirs(os.path.dirname(log_file_path), exist_ok=True)

    # Set up file logging
    logger.add(
        log_file_path,
        format="{time:YYYY-MM-DD HH:mm:ss} | {level} | {message}",
        level="INFO",
        rotation="10 MB",
        compression="zip"
    )

    # Set up console logging for INFO level in green, outputting to stdout
    logger.add(
        sys.stdout,
        format="<green>{time:YYYY-MM-DD HH:mm:ss}</green> | <green>{level}</green> | {message}",
        level="INFO",
        colorize=True
    )

    # Set up console logging for ERROR level in red, outputting to stderr
    logger.add(
        sys.stderr,
        format="<red>{time:YYYY-MM-DD HH:mm:ss}</red> | <red>{level}</red> | {message}",
        level="ERROR",
        colorize=True
    )


    return logger