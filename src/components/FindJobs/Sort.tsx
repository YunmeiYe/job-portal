import { useState } from 'react';
import { Combobox, useCombobox } from '@mantine/core';
import { IconAdjustments } from '@tabler/icons-react';
import { useDispatch } from 'react-redux';
import { updateSort } from '../../store/sortSlice';

const jobSort = ['Relevance', 'Most Recent', 'Salary (Low to High)', 'Salary (High to Low)'];
const talentSort = ['Relevance', 'Experience (Low to High)', 'Experience (High to Low)'];

const Sort = (props: any) => {
  const dispatch = useDispatch();
  const [selectedItem, setSelectedItem] = useState<string | null>('Relevance');
  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });

  const options = props.sort == "job"
    ? jobSort.map((item) => (
      <Combobox.Option className='text-xs' value={item} key={item}>{item}</Combobox.Option>))
    : talentSort.map((item) => (
      <Combobox.Option className='text-xs' value={item} key={item}>{item}</Combobox.Option>));

  return (
    <Combobox
      store={combobox}
      width={150}
      position="bottom-start"
      withArrow
      onOptionSubmit={(val) => {
        setSelectedItem(val);
        dispatch(updateSort(val));
        combobox.closeDropdown();
      }}
    >
      <Combobox.Target>
        <div className='border border-bright-sun-400 flex gap-2 p-2 pr-1 xs-mx:p-1 text-sm xs-mx:text-xs rounded-xl items-center cursor-pointer hover:bg-mine-shaft-900' onClick={() => combobox.toggleDropdown()}>
          {selectedItem}
          <IconAdjustments className='w-5 h-5 text-bright-sun-400' />
        </div>
      </Combobox.Target>

      <Combobox.Dropdown>
        <Combobox.Options>{options}</Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  );
}

export default Sort;