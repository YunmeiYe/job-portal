const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const options = {
    year: 'numeric' as const,
    month: 'short' as const,
    day: 'numeric' as const,
  };
  return date.toLocaleString('en-US', options);
}

const formatTime = (dateString: string) => {
  const date = new Date(dateString);
  const options = {
    year: 'numeric' as const,
    month: 'long' as const,
    day: 'numeric' as const,
    hour: 'numeric' as const,
    minute: 'numeric' as const,
    timeZone: 'UTC' as const,
  };
  return date.toLocaleString('en-US', options);
}

const timeAgo = (timestamp: string) => {
  const now = new Date();
  const past = new Date(timestamp);
  const diff = now.getTime() - past.getTime();

  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30);

  if (seconds < 60) {
    return `${seconds} second${seconds > 1 ? "s" : ""} ago`;
  } else if (minutes < 60) {
    return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
  } else if (hours < 24) {
    return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  } else if (days < 30) {
    return `${days} day${days > 1 ? "s" : ""} ago`;
  } else {
    return `${months} minute${months > 1 ? "s" : ""} ago`;
  }
}

const getBase64 = (file: any) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
}

const openBase64PDF = (base64String:any) => {
  const byteChars = atob(base64String);
  const byteNumbers = new Array(byteChars.length);
  for (let i = 0; i < byteChars.length; i++) {
    byteNumbers[i] = byteChars.charCodeAt(i);
  };
  const blob = new Blob([new Uint8Array(byteNumbers)], { type: 'application/pdf' });
  const blobURL = URL.createObjectURL(blob);
  window.open(blobURL, '_blank');
}

export { formatDate,formatTime, timeAgo, getBase64, openBase64PDF }