const imageUrl = process.env.REACT_APP_FILE_BASE_URL;

export const ImageLink = (name) => {
    return `${imageUrl}${name}`;
};

export const clearAllAuthData = () => {
    const roles = ["user", "admin"];
    roles.forEach(r => {
        localStorage.removeItem(`${r}AccessToken`);
        localStorage.removeItem(`${r}payload`);
        localStorage.removeItem(`${r}RefreshToken`);
        
    });
};

export function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }
  