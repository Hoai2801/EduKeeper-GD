package com.GDU.backend.services.Impl;

import com.GDU.backend.models.Document;
import com.GDU.backend.models.Specialized;
import com.GDU.backend.repositories.SpecializedRepository;
import com.GDU.backend.services.SpecializedService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.Month;
import java.time.Year;
import java.time.YearMonth;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

@Service
@RequiredArgsConstructor
public class SpecializedServiceImpl implements SpecializedService {
    private final SpecializedRepository specializedRepository; 
    
    @Override
    public List<Specialized> getSpecializeds() {
        return specializedRepository.findAllFromId(1L); 
    }

    @Override
    public List<Specialized> getSpecializedsByDepartment(Long departmentID) {
        return specializedRepository.findAllFromDepartment(departmentID);
    }

    @Override
    public List<Document> getDocumentsBySpecialized(String specializedId) {
        return specializedRepository.getLastestDocumentsBySpecialized(specializedId);
    }

    @Override
    public int getDocumentsCountBySpecialized(String specializedSlug) {
        return specializedRepository.getLastestDocumentsBySpecialized(specializedSlug).size();
    }

    @Override
    public List<Document> getDocumentsFromDay(Long id, Long day) {
        Calendar cal = Calendar.getInstance();
        cal.add(Calendar.DATE, (int) - day);
        System.out.println("date = " + cal.getTime());
        LocalDate.of(Year.now().getValue(), YearMonth.now().getMonthValue(), LocalDate.now().getDayOfMonth() - 7);
        return specializedRepository.getDocumentsByDate(id, cal.getTime()); 
    }
}
