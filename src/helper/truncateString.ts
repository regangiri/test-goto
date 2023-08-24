function truncateString(input: string, maxLength: number): string {
  if (input.length <= maxLength) {
    return input;
  }

  return input.substring(0, maxLength) + "...";
}

export default truncateString;
