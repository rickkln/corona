import React from 'react';
import ReactTags, { Tag } from 'react-tag-autocomplete';
import './countryFilter.css';

export interface Tags {
  currentTags: Tag[]
  suggestedTags: Tag[]
}

const CountryFilter = ({
  tags,
  setTags,
}: {
  tags: Tags,
  setTags: (tags: Tags) => void,
}) => {
  const handleDelete = (index: number) => {
    const currentTags = tags.currentTags.slice(0);
    currentTags.splice(index, 1);
    setTags({ ...tags, currentTags });
  };
  const handleAddition = (tag: Tag) => {
    const currentTags = tags.currentTags.length > 5
      ? tags.currentTags.slice(1)
      : tags.currentTags;
    setTags({ ...tags, currentTags: [...currentTags, tag] });
  };
  return (
    <ReactTags
      tags={tags.currentTags}
      suggestions={tags.suggestedTags}
      handleDelete={handleDelete}
      handleAddition={handleAddition}
      placeholder="Add Country"
      minQueryLength={1}
    />
  );
};

export default CountryFilter;
