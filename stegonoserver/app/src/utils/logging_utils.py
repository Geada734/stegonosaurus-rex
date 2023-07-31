"""Logging utils for the application server."""
from datetime import datetime


def log(status: int, message: str) -> None:
    """Logs to console and log files."""
    now = datetime.now()
    timestamp = now.strftime("%Y/%m/%d %H:%M:%S")
    log_message = ("\n" + timestamp + "\n"
                + str(status) + "\n"
                + message + "\n")
    log_message += "xxxxxxxxxxxxxxxxxxxxxxxxx"

    print(log_message)
